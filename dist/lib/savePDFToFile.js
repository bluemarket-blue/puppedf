"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePDFToFile = void 0;
const fs_1 = require("fs");
// Function to convert the ReadableStream into a file with a destination 
async function savePDFToFile(pdfStream, filePath) {
    return new Promise((resolve, reject) => {
        const fileWriteStream = (0, fs_1.createWriteStream)(filePath);
        pdfStream.pipe(fileWriteStream);
        fileWriteStream.on('finish', () => {
            console.log(`The PDF has been successfully saved in the : ${filePath}`);
            resolve();
        });
        fileWriteStream.on('error', (error) => {
            console.error('An error occurred when saving the PDF to the :', error);
            reject(error);
        });
    });
}
exports.savePDFToFile = savePDFToFile;
