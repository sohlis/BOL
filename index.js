const PDFDocument = require('pdfkit');
const fs = require('fs');

// [width, height] in PDF points(72 per inch)

// Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

const docWidth = 612;
const marginHorizontal = 50;
const marginVertical = 50;
const fz = [24, 16, 14, 10, 8]

// Right Header
doc
  .fontSize(fz[0])
  .text('Bill of Lading', marginHorizontal, marginVertical)
  .fontSize(fz[1])
  .text('Premier Packaging Inc', marginHorizontal, marginVertical + 30)

// // Left Header
doc  
  .fontSize(fz[3])
  .text('Page 1 of 2', docWidth - 150, marginVertical, {
    align: 'right',
    width: 100
  })

doc
  .fontSize(fz[4])
  .text('All pages must be signed', docWidth - 150, marginVertical + 15, {
    align: 'right',
    width: 100
  })

// Finalize PDF file
doc.end();

console.log('Success!')