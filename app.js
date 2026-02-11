import express from "express";
import path from "node:path";
const app = express();

function handleError(err) {
    if (err) {
        console.log(err.message);
        res.status(404).send(err.message);
    } else {
        console.log("File sent succesfully");
    }
}

app.get("/", (_, res) => {
    res.sendFile(path.resolve("index.html"), handleError);
});

app.get("/about", (_, res) => {
    res.sendFile(path.resolve("about.html"), handleError);
});

app.get("/contact-me", (_, res) => {
    res.sendFile(path.resolve("contact-me.html"), handleError);
});

app.use((_, res) => {
    res.sendFile(path.resolve("404.html"), handleError);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(`Some error occured ${err.message}`);
    } else {
        console.log("Server up and running at port 3000");
    }
});
