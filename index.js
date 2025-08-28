const express = require("express");
const cors = require("cors");
const multer = require("multer");

const PDFtoWordRoute = require("./routes/convert");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/convert", PDFtoWordRoute);

app.listen(PORT, () => {
    console.log(`Server started successfully on port:${PORT}`);

})
