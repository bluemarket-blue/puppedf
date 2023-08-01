import { createWriteStream } from 'fs';

// Function to convert the ReadableStream into a file with a destination 
export async function savePDFToFile(pdfStream: NodeJS.ReadableStream, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const fileWriteStream = createWriteStream(filePath);

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