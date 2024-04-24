const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

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
        emails.data.push({
            sender: "metlov.nm@yandex.ru",
            title: "TEST",
            theme: "TEST",
        });

        fs.writeFile("./static/data.json", JSON.stringify(emails), err => {
            if (err) {
                console.error(err);
                return;
            }
            res.send("OK");
        });
    });
});

app.listen(3000);

// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         fs.readFile("index.html", (err, data) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.write("Error loading index.html");
//                 res.end();
//             } else {
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.end(data);
//             }
//         });
//     } else if (req.url === "/dist/bundle.css") {
//         fs.readFile("./dist/bundle.css", (err, data) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.write("Error loading style.css");
//                 res.end();
//             } else {
//                 res.writeHead(200, { "Content-Type": "text/css" });
//                 res.end(data);
//             }
//         });
//     } else if (req.url === "/static/global.css") {
//         fs.readFile("./static/global.css", (err, data) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.write("Error loading style.css");
//                 res.end();
//             } else {
//                 res.writeHead(200, { "Content-Type": "text/css" });
//                 res.end(data);
//             }
//         });
//     } else if (req.url === "/dist/app.js") {
//         fs.readFile("./dist/app.js", (err, data) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.write("Error loading style.css");
//                 res.end();
//             } else {
//                 res.writeHead(200, { "Content-Type": "application/javascript" });
//                 res.end(data);
//             }
//         });
//     }
// });

// server.listen(8080, () => {
//     console.log(`Server is listening on port 8080`);
// });
