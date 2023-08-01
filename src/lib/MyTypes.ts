export interface PdfGenerationOptions {
    displayHeaderFooter?: boolean; // ------- default false
    footerTemplate?: string;
    format?: PaperFormat;// ----------------- default Letter
    headerTemplate?: string;
    height?: string | number;
    landscape?: boolean ; //----------------- default false
    margin?: PDFMargin; //------------------- default undefinded
    omitBackground?: boolean; //------------- default false
    pageRanges?: string; //------------------ empty means all pages are printed or string = 1-5, 8, 11-13 to print specific page
    path?: string; // ----------------------- undefinded which means not be writtern to disk
    preferCSSPageSize?: boolean; //----------- default false
    printBackground?: boolean; //------------ default false
    scale?: number; //----------------------- default 1
    timeout?: number; //--------------------- 30_000 ms 
    width?: string | number;
}

export enum OutputPreferType {
    buffer,
    file,
    ReadableStream
} 

export type PaperFormat =
  | Uppercase<LowerCasePaperFormat>
  | Capitalize<LowerCasePaperFormat>
  | LowerCasePaperFormat;

  export type LowerCasePaperFormat =
  | 'letter'
  | 'legal'
  | 'tabloid'
  | 'ledger'
  | 'a0'
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6';

export interface PDFMargin {
    bottom?: string | number;
    left?:  string | number;
    right?:  string | number;
    top?:  string | number;
}