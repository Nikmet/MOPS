const fs = require("fs");
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

const PORT = 3000;

// Настройки для подключения к почтовому ящику
const imapConfig = {
    user: "metlov.nm@gmail.com",
    password: "ptcl huvs phea uoqq",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { servername: "imap.gmail.com" },
};

function addEmail(parsed) {
    fs.readFile("./static/data.json", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const emails = JSON.parse(data);

        const email = {
            sender: parsed.from.value[0].address,
            theme: parsed.subject,
            favorites: false,
        };

        emails.data.push(email);

        fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
}

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
app.get("/dist/app.js", (req, res) => {
    res.setHeader("Content-type", "application/javascript");
    res.sendFile(path.resolve(__dirname, "dist", "app.js"));
});

app.get("/api/sendEmail", (req, res) => {
    fs.readFile("./static/data.json", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const emails = JSON.parse(data);
        emails.data.push(req.body);

        fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
            if (err) {
                console.error(err);
                return;
            }
            res.send("OK");
        });
    });
});
app.get("/api/clearData", (req, res) => {
    fs.readFile("./static/data.json", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const emails = JSON.parse(data);

        emails.data = [];

        fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
    res.send({ status: "OK" });
});

app.get("/api/getEmails", (req, res) => {
    try {
        const imap = new Imap(imapConfig);

        imap.once("ready", () => {
            imap.openBox("INBOX", false, () => {
                imap.search(["ALL"], (err, response) => {
                    const f = imap.fetch(response, { bodies: "" });
                    f.on("message", msg => {
                        msg.on("body", stream => {
                            simpleParser(stream, (err, parsed) => {
                                addEmail(parsed);
                            });
                        });
                    });
                });
            });
        });

        imap.once("end", () => {
            fs.readFile("./static/data.json", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const emails = JSON.parse(data);
                res.send(emails);
            });
        });

        imap.connect();
    } catch (e) {
        res.send({ status: e.message });
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
