<div align="center">
        <img src="/docs/images/logo.png" alt="Puppedf logo" align="center" />
</div>

<h1 align="center">Puppedf - Easiest way to generate pdf from html </h1>
<h3 align="center">Use your Template and feed with data</h3>
<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

https://img.shields.io/badge/Maintained%3F-yes-green.svg


</div>

<div align="center"><b>Links:<br> <a href="https://bluemarket.blue">Website</a> • <a href="https://https://pptr.dev">Puppeteer</a></div>
<br>


## About

Puppedf is an npm library that lets you easily convert HTML templates into PDF files using Puppeteer. You can also replace keys in the HTML template with specified values to customize the content of the generated PDF.

## Why puppedf

We needed to generate legal documents for the operation of our platform, such as invoices, contracts and so on. We needed a tool that would enable us to always follow the same template, but also allow us to automate the modification of fields. That's why we created this npm package

## Features

Puppedf provides the following features:

- **PDF generation from HTML templates**
- **Customize PDF content by replacing keys in the template**
- **Support for PDF generation options to adjust format, headers, footers, etc**
- **will give you a ReadbleStream or a pdf file**


## Installation

Install via NPM:

```bash
npm i -D @bluemarket-blue/puppedf
```

Installing via npm is currently the default.

## Getting started

To start using Puppedf, import the function `generatePDFstream`. :

```javascript
import { generatePDFstream } from '@bluemarket-blue/puppedf';
```

Then call the function to generate a PDF :

```javascript
const html = '<html><body><h1>Hello, Puppedf!</h1></body></html>';
const pdfStream = await generatePDFstream(html);

// You can then save the PDF as a file
await savePDFToFile(pdfStream, './output.pdf');
```

You can also replace keys in the HTML template using a key-value array :

```javascript
import { replaceKeysInHTML } from '@bluemarket-blue/puppedf';

const htmlTemplate = '<html><body><h1>Hello, {{name}}!</h1></body></html>';
const cssTemplate ='body {
        background-color: #00FF00;
        }';
const data = [{ key: 'name', value: 'John Doe' }];

const pdfStream = await generatePDFstream(htmlTemplate, cssTemplate, data);


```


And you can always use puppeteer's full range of options to style your pdf. :

```javascript
import { replaceKeysInHTML } from '@bluemarket-blue/puppedf';

const htmlTemplate = '<html><body><h1>Hello, {{name}}!</h1></body></html>';

const cssTemplate ='body {
        background-color: #00FF00;
        }';

const data = [{ key: 'name', value: 'John Doe' }];

const options = {
  printBackground: true,
  landscape: true
}
const data = [{ key: 'name', value: 'John Doe' }];

const pdfStream = await generatePDFstream(htmlTemplate, cssTemplate, data, options);

```
## PDF generation options

You can customize PDF generation using the following options:

- `displayHeaderFooter`: Display header and footer (Boolean)
- `headerTemplate`: Header template
- `footerTemplate`: Footer template
- `format`: Paper format (e.g. 'A4', 'Letter', 'Legal', etc.)
- height`: Paper height in inches or millimeters.
- landscape`: Display in landscape mode (Boolean)
- margin`: Paper margins
- `omitBackground`: Omit background when generating (Boolean)
- pageRanges`: Page ranges to be included in the PDF (e.g. '1-5', '2', '7-10')
- path`: PDF save path
- `preferCSSPageSize`: Use CSS size rather than paper size (Boolean)
- `printBackground`: Print page backgrounds (Boolean)
- scale`: Page scale (float)
- timeout`: Timeout for PDF generation (in milliseconds)
- width`: Paper width in inches or millimeters

More detail here https://pptr.dev/api/puppeteer.pdfoptions

## Examples

You can find usage examples in the `examples` folder of the GitHub repository.

## Contribution

Contributions are welcome! If you find a bug or want to add a new feature, don't hesitate to open an issue or propose a pull request.

## License

Puppedf is distributed under the MIT license. See the `LICENSE` file for more information.

---

Feel free to adjust the content to suit your needs and add screenshots or other relevant information. This should provide a solid basis for your README to inform users of your npm package and facilitate their use. Good luck with your project!

## Repository

[Repository](https://github.com/bluemarket-blue/puppedf)

## Changelog

[Changelog](https://github.com/bluemarket-blue/puppedf/releases)

## Inspiration

If you like the framework, it will be very cool if you rate the repository with a star ★



