import * as puppeteer from 'puppeteer';
import { PassThrough } from 'stream';

import { OutputFile } from 'typescript';
import { OutputPreferType, PdfGenerationOptions } from './MyTypes';
import { savePDFToFile } from './savePDFToFile';

export async function generatePDFFromHTMLAndCSS(html: string, css?: string, options?: PdfGenerationOptions): Promise<NodeJS.ReadableStream> {
    if (!html) {
        throw new Error('HTML content must be provided.');
    }

    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    try {
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


/* export async function generatePDFFromHTMLAndCSSsss(html: string, css?: string, options?: PdfGenerationOptions ): Promise<NodeJS.ReadableStream | Buffer | string | null> {
    if (!html) {
        throw new Error('HTML content must be provided.');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {


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



  
      await browser.close();
  
      switch (outputType) {
        case 'buffer':
          return pdfBuffer;
        case 'file':
          // Implement file handling if required
          break;
        default:
          // Transforms the Buffer into a ReadableStream
          const pdfStream = new PassThrough();
          pdfStream.end(pdfBuffer);
          return pdfStream;
      }
  
      return null;
    } catch (error) {
      console.error('An error occurred while generating the PDF :', error);
      await browser.close();
      throw error;
    }
  } */