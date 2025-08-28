// process.env.LIBREOFFICE_BIN = "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe";

const fs = require("fs").promises;
const path = require("path");
const libre = require("libreoffice-convert");
const { promisify } = require("util");

const libreConvertAsync = promisify(libre.convert);

// =======================
// Convert PDF → Word
// =======================
async function convertPDFtoWordHandler(req, res) {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");

    const ext = "docx";
    const inputPath = path.resolve(file.path);
    const outputPath = path.resolve(`./uploads/${Date.now()}-converted.${ext}`);

    try {
        const fileData = await fs.readFile(inputPath);
        const convertedData = await libreConvertAsync(fileData, ext, undefined);

        await fs.writeFile(outputPath, convertedData);

        res.download(outputPath, async (err) => {
            try {
                await fs.unlink(inputPath);
                await fs.unlink(outputPath);
            } catch (cleanupErr) {
                console.error("Cleanup error:", cleanupErr);
            }

            if (err) {
                console.error("Download error:", err);
                return res.status(500).send("Download failed");
            }
        });
    } catch (error) {
        console.error("Conversion error:", error);
        try {
            await fs.unlink(inputPath);
        } catch (_) { }
        return res.status(500).send("Conversion failed");
    }
}

// =======================
// Convert Word → PDF
// =======================
async function convertWordToPDFHandler(req, res) {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");

    const ext = ".pdf";
    const inputPath = path.resolve(file.path);
    const outputPath = path.resolve(`./uploads/${Date.now()}-converted${ext}`);

    try {
        const fileData = await fs.readFile(inputPath);
        const convertedData = await libreConvertAsync(fileData, ext, undefined);

        await fs.writeFile(outputPath, convertedData);

        res.download(outputPath, async (err) => {
            try {
                await fs.unlink(inputPath);
                await fs.unlink(outputPath);
            } catch (cleanupErr) {
                console.error("Cleanup error:", cleanupErr);
            }

            if (err) {
                console.error("Download error:", err);
                return res.status(500).send("Download failed");
            }
        });
    } catch (error) {
        console.error("Conversion error:", error);
        try {
            await fs.unlink(inputPath);
            await fs.unlink(outputPath);
        } catch (_) { }
        return res.status(500).send("Conversion failed");
    }
}

module.exports = {
    convertPDFtoWordHandler,
    convertWordToPDFHandler,
};
