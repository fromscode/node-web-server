import http from "node:http";
import fs from "node:fs/promises";

let index = null;
let about = null;
let contact = null;
let err404 = null;

const server = http.createServer(async (req, res) => {
    console.log(`Request received: ${req.headers.host}${req.url}`);
    const headers = {
        "Content-type": "text/html",
    };
    let statusCode = 200;
    let data = null;

    try {
        switch (req.url) {
            case "/": {
                if (!index) {
                    index = await fs.readFile("./index.html");
                }
                data = index;
                break;
            }
            case "/about": {
                if (!about) {
                    about = await fs.readFile("./about.html");
                }
                data = about;
                break;
            }
            case "/contact-me": {
                if (!contact) {
                    contact = await fs.readFile("./contact-me.html");
                }
                data = contact;
                break;
            }
            default: {
                if (!err404) {
                    err404 = await fs.readFile("./404.html");
                }
                statusCode = 404;
                data = err404;
            }
        }
    } catch (err) {
        console.log(err);
        if (!err404) {
            err404 = await fs.readFile("./404.html");
        }
        statusCode = 404;
        data = err404;
    } finally {
        res.writeHead(statusCode, headers);
        res.end(data);
    }
});

server.listen(8080);
