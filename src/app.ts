import * as puppeteer from 'puppeteer';
import { PassThrough } from 'stream';
import { createWriteStream } from 'fs';

async function generatePDFFromHTMLAndCSS(html: string, css: string): Promise<NodeJS.ReadableStream | null> {
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

    // Ajoutez du code ici pour interagir avec la page (si nécessaire).

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Transforme le Buffer en ReadableStream
    const pdfStream = new PassThrough();
    pdfStream.end(pdfBuffer);

    return pdfStream;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la génération du PDF :', error);
    await browser.close();
    return null; // Retourne null en cas d'erreur
  }
}

// Fonction pour convertir le ReadableStream en fichier et sauvegarder à la racine du projet
async function savePDFToFile(pdfStream: NodeJS.ReadableStream, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileWriteStream = createWriteStream(filePath);

    pdfStream.pipe(fileWriteStream);

    fileWriteStream.on('finish', () => {
      console.log(`Le PDF a été sauvegardé avec succès dans le fichier : ${filePath}`);
      resolve();
    });

    fileWriteStream.on('error', (error) => {
      console.error('Une erreur s\'est produite lors de la sauvegarde du PDF dans le fichier :', error);
      reject(error);
    });
  });
}

// Exemple d'utilisation
const sampleHTML = `
  <html>
    <body>
      <h1>Hello, World!</h1>
      <p>Ceci est un exemple de page HTML.</p>
    </body>
  </html>
`;

const sampleCSS = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
  }
  h1 {
    color: #007bff;
  }
  p {
    color: #333;
  }
`;

generatePDFFromHTMLAndCSS(sampleHTML, sampleCSS)
  .then((pdfStream) => {
    if (pdfStream) {
      const outputPath = './output.pdf'; // Chemin du fichier de sortie à la racine du projet
      return savePDFToFile(pdfStream, outputPath);
    } else {
      console.log('La génération du PDF a échoué.');
    }
  })
  .catch((error) => {
    console.error('Une erreur s\'est produite :', error);
  });