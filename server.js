const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Imap = require("imap");
const inspect = require("util").inspect;
const fs = require("fs");

const app = express();
const jsonParser = bodyParser.json();

const PORT = 3000;

// function addEmail(parsed) {
//     fs.readFile("./static/data.json", (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         const emails = JSON.parse(data);

//         const email = {
//             sender: parsed.from.value[0].address,
//             theme: parsed.subject,
//             favorites: false,
//         };

//         emails.data.push(email);

//         fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//         });
//     });
// }

const myMail = "metlov.nm@gmail.com";
const myPwd = "ptcl huvs phea uoqq";
let emails = [];
let IMAPended = false;

function saveDataToFile(data, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                console.error(err);
                reject();
            }
            console.log(`Данные успешно сохранены в файл ${fileName}`);
            resolve();
        });
    });
}

let getEmailFromInbox = async mailServer => {
    return new Promise((resolve, reject) => {
        mailServer.openBox("INBOX", true, function (err, box) {
            if (err) throw err;

            let f = mailServer.seq.fetch("1:*", {
                bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
                struct: true,
            });

            f.on("message", function (msg, seqno) {
                console.log("Message #%d", seqno);
                let prefix = "(#" + seqno + ") ";

                msg.on("body", function (stream, info) {
                    let buffer = "";

                    stream.on("data", function (chunk) {
                        buffer += chunk.toString("utf8");
                    });

                    stream.once("end", function () {
                        let data = {
                            theme: Imap.parseHeader(buffer).subject[0],
                            sender: Imap.parseHeader(buffer).from[0].split("<")[1].split(">")[0],
                            isFavorite: false,
                        };
                        emails.push(data);
                        console.log(prefix + "Parsed header: %s", inspect(Imap.parseHeader(buffer)));
                    });
                });
            });

            f.once("error", function (err) {
                console.log("Fetch error: " + err);
                reject();
            });

            f.once("end", async function () {
                console.log("Done fetching all messages!");
                await saveDataToFile(emails, "./static/data.json");
                resolve();
            });
        });
    });
};

// app.get("/api/getEmails", async (req, res) => {
//     try {
//         let mailServer1 = new Imap({
//             user: myMail,
//             password: myPwd,
//             host: "imap.gmail.com",
//             port: 993,
//             tls: true,
//             tlsOptions: {
//                 rejectUnauthorized: false,
//             },
//             authTimeout: 3000,
//         });

//         await mailServer1.once("ready", function () {
//             mailServer1.openBox("INBOX", true, function (err, box) {
//                 if (err) throw err;
//                 console.log("message", "server1 ready");
//             });
//         });

//         await getEmailFromInbox(mailServer1);

//         mailServer1.once("end", () => {
//             res.send("OK");
//         });

//         mailServer1.connect();
//     } catch (e) {
//         res.send(e);
//     }
// });

app.use(express.static(path.resolve(__dirname, "static")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});
app.get("/dist/bundle.css", (req, res) => {
    res.setHeader("Content-type", "text/css");
    res.sendFile(path.resolve(__dirname, "dist", "bundle.css"));
});
app.get("/static/global.css", (req, res) => {
    res.setHeader("Content-type", "text/css");
    res.sendFile(path.resolve(__dirname, "static", "global.css"));
});
app.get("/static/data.json", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.sendFile(path.resolve(__dirname, "static", "data.json"));
});
app.get("/dist/app.js", (req, res) => {
    res.setHeader("Content-type", "application/javascript");
    res.sendFile(path.resolve(__dirname, "dist", "app.js"));
});

// app.get("/api/clearData", (req, res) => {
//     fs.readFile("./static/data.json", (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         const emails = JSON.parse(data);

//         emails.data = [];

//         fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//         });
//     });
//     res.send({ status: "OK" });
// });

app.get("/api/getEmails", async (req, res) => {
    try {
        let mailServer1 = new Imap({
            user: myMail,
            password: myPwd,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false,
            },
            authTimeout: 3000,
        }).once("error", function (err) {
            console.log("Source Server Error:- ", err);
        });

        mailServer1.once("ready", async function () {
            mailServer1.openBox("INBOX", true, function (err, box) {
                if (err) throw err;
                console.log("message", "server1 ready");
            });

            await getEmailFromInbox(mailServer1);
        });

        mailServer1.once("end", () => {
            IMAPended = true;
        });

        if (!IMAPended) mailServer1.connect();
        else {
            mailServer1.close();
            IMAPended = false;
            return res.send("OK");
        }
    } catch (e) {
        return res.send(e);
    }
});

app.post("/api/sendEmail", jsonParser, async function (req, res) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "metlov.nm@gmail.com",
                pass: "ptcl huvs phea uoqq",
            },
        });

        const { recipient, theme, text } = req.body;
        await transporter.sendMail({
            from: "metlov.nm@gmail.com",
            to: recipient,
            subject: theme,
            text: text,
        });

        return res.status(200).send({
            message: `Вы отправили письмо ${recipient}`,
        });
    } catch (e) {
        return res.status(500).send({
            status: 500,
            message: e.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`linked by http://localhost:${PORT}`);
});
