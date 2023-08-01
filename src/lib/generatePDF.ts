import * as puppeteer from 'puppeteer';
import { PassThrough } from 'stream';

export async function generatePDFFromHTMLAndCSS(html: string, css: string): Promise<NodeJS.ReadableStream | null> {
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
    const pdfStream = new PassThrough();
    pdfStream.end(pdfBuffer);

    return pdfStream;

    } catch (error) {
        console.error('An error occurred while generating the PDF :', error);
        await browser.close();
        return null;
    }
}