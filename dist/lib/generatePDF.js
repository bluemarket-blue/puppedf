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
exports.generatePDFstream = void 0;
const puppeteer = __importStar(require("puppeteer"));
const stream_1 = require("stream");
const replaceKeysInTemplate_1 = require("./replaceKeysInTemplate");
async function generatePDFstream(html, css, data, options) {
    if (!html) {
        return Promise.reject(new Error('HTML content must be provided.'));
    }
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();
    try {
        const htmlIn = `
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
        await page.setContent((data ? (0, replaceKeysInTemplate_1.replaceKeysInHTML)(htmlIn, data) : htmlIn), { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            displayHeaderFooter: options?.displayHeaderFooter,
            footerTemplate: options?.footerTemplate,
            format: options?.format,
            headerTemplate: options?.headerTemplate,
            height: options?.height,
            landscape: options?.landscape,
            margin: options?.margin,
            omitBackground: options?.omitBackground,
            pageRanges: options?.pageRanges,
            path: options?.path,
            preferCSSPageSize: options?.preferCSSPageSize,
            printBackground: options?.printBackground,
            scale: options?.scale,
            timeout: options?.timeout,
            width: options?.width
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
        throw error;
    }
}
exports.generatePDFstream = generatePDFstream;
