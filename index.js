import http from "node:http";
import fs from "node:fs";

let index = null;
let about = null;
let contact = null;
let err404 = null;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.headers.host}${req.url}`);
    const headers = {
        "Content-type": "text/html",
    };
    let statusCode = 200;
    let data = null;

    switch (req.url) {
        case "/": {
            if (!index) {
                index = fs.readFileSync("./index.html");
            }
            data = index;
            break;
        }
        case "/about": {
            if (!about) {
                about = fs.readFileSync("./about.html");
            }
            data = about;
            break;
        }
        case "/contact-me": {
            if (!contact) {
                contact = fs.readFileSync("./contact-me.html");
            }
            data = contact;
            break;
        }
        default: {
            if (!err404) {
                err404 = fs.readFileSync("./404.html");
            }
            statusCode = 404;
            data = err404;
        }
    }

    res.writeHead(statusCode, headers);
    res.end(data);
});

server.listen(8080);
