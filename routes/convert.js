const express = require("express");
const multer = require("multer");
const { convertPDFtoWordHandler, convertWordToPDFHandler } = require("../controller/convert");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/pdf-to-word", upload.single("file"), convertPDFtoWordHandler);

router.post("/word-to-pdf", upload.single("file"), convertWordToPDFHandler);

module.exports = router;