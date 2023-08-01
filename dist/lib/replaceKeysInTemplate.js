"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceKeysInHTML = void 0;
function replaceKeysInHTML(html, replacements) {
    // Replace each key with its HTML value
    for (const replacement of replacements) {
        const searchKey = `{{${replacement.key}}}`;
        const replaceValue = replacement.value;
        html = html.replaceAll(searchKey, replaceValue);
    }
    return html;
}
exports.replaceKeysInHTML = replaceKeysInHTML;
