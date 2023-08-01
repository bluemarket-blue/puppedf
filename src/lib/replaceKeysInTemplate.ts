export function replaceKeysInHTML(html: string, replacements: { key: string, value: string }[]): string {
    // Replace each key with its HTML value
    for (const replacement of replacements) {
        const searchKey = `{{${replacement.key}}}`;
        const replaceValue = replacement.value;
        html = html.replaceAll(searchKey, replaceValue);
    }

    return html;
}