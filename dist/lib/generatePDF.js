"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDFFromHTMLAndCSS = void 0;
const puppeteer = __importStar(require("puppeteer"));
const stream_1 = require("stream");
async function generatePDFFromHTMLAndCSS(html, css) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        // Combinez le code HTML et CSS pour former la page complète
        const pageContent = `
        <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>
            <body>
                ${html}
            </body>
        </html>
    `;
        await page.setContent(pageContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });
        await browser.close();
        // Transforms the Buffer into a ReadableStream
        const pdfStream = new stream_1.PassThrough();
        pdfStream.end(pdfBuffer);
        return pdfStream;
    }
    catch (error) {
        console.error('An error occurred while generating the PDF :', error);
        await browser.close();
        return null;
    }
}
exports.generatePDFFromHTMLAndCSS = generatePDFFromHTMLAndCSS;
