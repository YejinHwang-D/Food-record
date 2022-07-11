const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("성공!?");
})


app.listen(port, () => {
    console.log("server on 3000 port");
});
