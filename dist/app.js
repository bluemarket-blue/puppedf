"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatePDF_1 = require("./lib/generatePDF");
const replaceKeysInTemplate_1 = require("./lib/replaceKeysInTemplate");
const savePDFToFile_1 = require("./lib/savePDFToFile");
// Exemple d'utilisation
const sampleHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice</title>
</head>
<body>
  <div class="invoice">
    <div class="invoice-header">
      <div class="invoice-logo">
        <!-- Your logo here -->
      </div>
      <div class="invoice-info">
        <!-- Your company information here -->
        <p>{{seller_name}}</p>
        <p>{{seller_address}}</p>
        <p>Phone: {{seller_phone}}</p>
        <p>Email: {{seller_email}}</p>
        <p>VAT ID: {{seller_vat_id}}</p>
      </div>
    </div>
    <h1 class="invoice-title">INVOICE</h1>
    <div class="invoice-addresses">
      <div class="invoice-address">
        <!-- Buyer's information here -->
        <p>Buyer:</p>
        <p>Buyer's Name: {{buyer_name}}</p>
        <p>Buyer's Address: {{buyer_address}}</p>
        <p>VAT ID: {{buyer_vat_id}}</p>
      </div>
      <div class="invoice-address">
        <!-- Seller's information here -->
        <p>Seller:</p>
        <p>Seller's Name: {{seller_name}}</p>
        <p>Seller's Address: {{seller_address}}</p>
        <p>VAT ID: {{seller_vat_id}}</p>
      </div>
    </div>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{description}}</td>
          <td>{{quantity}}</td>
          <td>{{unit_price}}</td>
          <td>{{total}}</td>
        </tr>
      </tbody>
    </table>
    <div class="invoice-total">
      <p>Total Amount: {{total_amount}}</p>
    </div>
    <div class="invoice-footer">
      <div class="legal-text">
        <!-- Legal information here -->
        <p>VAT not applicable, Article 293B of the French CGI</p>
        <p>Company Registration, RCS Paris {{seller_rsc_number}}</p>
      </div>
      <div class="thank-you">
        {{thank_you_message}}
      </div>
    </div>
  </div>
</body>
</html>
`;
const sampleCSS = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.invoice {
  margin: 20px;
  max-width: 794px; /* A4 width in pixels at 72 DPI */
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.invoice-logo {
  width: 150px;
  height: 50px;
  /* Your logo URL or CSS background property here */
}

.invoice-info {
  font-size: 14px;
}

.invoice-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.invoice-addresses {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.invoice-address {
  flex: 1;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.invoice-table th,
.invoice-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.invoice-table th {
  background-color: #f2f2f2;
}

.invoice-total {
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}

.invoice-footer {
  text-align: center;
  font-size: 14px;
  color: #777;
  margin-top: 50px;
}

.legal-text {
  color: #888;
  font-size: 10px;
  margin-top: 20px;
  text-align: center;
}

.thank-you {
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  font-style: italic;
}
`;
const invoiceData = [
    { key: "seller_name", value: "ABC Company" },
    { key: "seller_address", value: "123 Main Street" },
    { key: "seller_phone", value: "555-123-4567" },
    { key: "seller_email", value: "info@abccompany.com" },
    { key: "seller_vat_id", value: "123456789" },
    { key: "buyer_name", value: "John Doe" },
    { key: "buyer_address", value: "456 Elm Avenue" },
    { key: "buyer_vat_id", value: "987654321" },
    { key: "total_amount", value: "150.00 €" },
    { key: "seller_rsc_number", value: "XYZ123456" },
    { key: "thank_you_message", value: "Thank you for your purchase!" },
    { key: "description", value: "T-shirt" },
    { key: "quantity", value: "2" },
    { key: "unit_price", value: "15.00 €" },
    { key: "total", value: "30.00 €" }
];
const finalHTML = (0, replaceKeysInTemplate_1.replaceKeysInHTML)(sampleHTML, invoiceData);
(0, generatePDF_1.generatePDFFromHTMLAndCSS)(finalHTML, sampleCSS)
    .then((pdfStream) => {
    if (pdfStream) {
        const outputPath = './output.pdf';
        return (0, savePDFToFile_1.savePDFToFile)(pdfStream, outputPath);
    }
    else {
        console.log('La génération du PDF a échoué.');
    }
})
    .catch((error) => {
    console.error('Une erreur s\'est produite :', error);
});
