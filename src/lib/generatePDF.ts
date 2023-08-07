import * as puppeteer from 'puppeteer';
import { PassThrough } from 'stream';
import { replaceKeysInHTML } from './replaceKeysInTemplate';
import { PdfGenerationOptions } from './options';

export async function generatePDFstream(html: string, data?: { key: string, value: string }[],  options?: PdfGenerationOptions): Promise<NodeJS.ReadableStream> {
    if (!html) {
        return Promise.reject(new Error('HTML content must be provided.'));
    }

    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    try {
    const htmlIn = `
                ${html}
    `;
        // html complet <html> </html> de manière à modifier le hearder plus facilement et d'intégrer soit même le css
    
    await page.setContent((data ? replaceKeysInHTML(htmlIn, data) : htmlIn ), { waitUntil: 'networkidle0' });
    
    
    const pdfBuffer = await page.pdf({
        displayHeaderFooter: options?.displayHeaderFooter,
        footerTemplate: options?.footerTemplate,
        format: options?.format ,
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
    const pdfStream = new PassThrough();
    pdfStream.end(pdfBuffer);

    return pdfStream;


    } catch (error) {
        console.error('An error occurred while generating the PDF :', error);
        await browser.close();
        throw error;
    }
}
