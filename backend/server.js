const express = require("express");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

app.listen(port);

console.log("Running in port", port);
