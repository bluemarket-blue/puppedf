import { replaceKeysInHTML } from "../lib/replaceKeysInTemplate";

const data = [
    { key: "div1", value: "<div>{{div2}}</div>" },
    { key: "div2", value: "<div>{{div3}}</div>" },
    { key: "div3", value: "here" }
  ];
  
  const htlm = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Invoice</title>
  </head>
  <body>
    {{div1}}
  </body>
  </html>
  `
  
  
  const rs = replaceKeysInHTML(htlm, data);