const PDFDocument = require('pdfkit');
const fs = require('fs');

// [width, height] in PDF points(72 per inch)

// Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

const docWidth = 612;
const marginHorizontal = 40;
const docWidthWithMargin = docWidth - marginHorizontal
const marginVertical = 40;
const fz = [24, 16, 14, 10, 8]

// Header
// Right Header
doc
  .fontSize(fz[0])
  .text('Bill of Lading', marginHorizontal, marginVertical)
  .fontSize(fz[1])
  .text('Premier Packaging Inc', marginHorizontal, marginVertical + 30)

// Left Header
doc  
  .fontSize(fz[3])
  .text('Page 1 of 1', docWidth - 150, marginVertical, {
    align: 'right',
    width: 100
  })
doc
  .fontSize(fz[4])
  .text('All pages must be signed', docWidth - 150, marginVertical + 15, {
    align: 'right',
    width: 100
  })
// END Header

// 
// Shipment information
// 
const shipmentInfoStartHeight = 115
// Left column
doc
  .fontSize(fz[3])
  .text('Document Date: 2019–04–24', marginHorizontal, shipmentInfoStartHeight)
  .text('UF Reference #: UF–18291023', marginHorizontal, shipmentInfoStartHeight + 20)
  .text('PO #: 182937', marginHorizontal, shipmentInfoStartHeight + 40)
// Right column
doc
  .fontSize(fz[3])
  .text('Carrier: Heavy Hauling Carrier Co', docWidth / 2, shipmentInfoStartHeight)
  .text('Driver: Dale Johnson', docWidth / 2, shipmentInfoStartHeight + 20)
  .text('Equipment Type: Dry Van', docWidth / 2, shipmentInfoStartHeight + 40)
// END Shipment information

// 
// Info Columns
// 
const infoColumnsStartHeight = 200;
// Left column
doc
  .fontSize(fz[2])
  .text('Pickup', marginHorizontal, infoColumnsStartHeight)
doc // Line
  .moveTo(marginHorizontal, infoColumnsStartHeight + 18)                               // set the current point
  .lineTo(docWidth/2 - marginHorizontal/2, infoColumnsStartHeight + 18)
  .stroke()

// Subcolumn Left
doc
  .fontSize(fz[3])
  .text('Address:', marginHorizontal, infoColumnsStartHeight + 40)  
  .moveDown(0.5)
  .text('410 Chestnut st')
  .moveDown(0.5)
  .text('San Francisco CA')
  .moveDown(0.5)
  .text('94133')

// Subcolumn Right
doc
  .fontSize(fz[3])
  .text('Time:', marginHorizontal + 130, infoColumnsStartHeight + 40)
  .moveDown(0.5)
  .text('Nov 12, 2019')
  .moveDown(0.5)
  .text('8:30AM CST')
  .moveDown(1.5)
  .text('Pickup #')
  .moveDown(0.5)
  .text('43299211')


// Right column
doc
  .fontSize(fz[2])
  .text('Dropoff', docWidth / 2, infoColumnsStartHeight)
doc // Line
  .moveTo(docWidth / 2, infoColumnsStartHeight + 18)                               // set the current point
  .lineTo(docWidth - marginHorizontal, infoColumnsStartHeight + 18)
  .stroke()

// Subcolumn Left
doc
  .fontSize(fz[3])
  .text('Address:', docWidth / 2, infoColumnsStartHeight + 40)
  .moveDown(0.5)
  .text('410 Chestnut st')
  .moveDown(0.5)
  .text('San Francisco CA')
  .moveDown(0.5)
  .text('94133')

// Subcolumn Right
doc
  .fontSize(fz[3])
  .text('Time:', docWidth / 2 + 130, infoColumnsStartHeight + 40)
  .moveDown(0.5)
  .text('Nov 12, 2019')
  .moveDown(0.5)
  .text('8:30AM CST')
  .moveDown(1.5)
  .text('Dropoff #')
  .moveDown(0.5)
  .text('43299211')

// END Info Columns

// 
// Customer Order
// 
const customerOrderStartHeight = 380

doc
  .fontSize(fz[2])
  .text('Customer order', marginHorizontal, customerOrderStartHeight)
doc // Line
  .moveTo(marginHorizontal, customerOrderStartHeight + 18)                               // set the current point
  .lineTo(docWidth - marginHorizontal, customerOrderStartHeight + 18)
  .stroke()

// First column
doc
  .fontSize(fz[3])
  .text('Quantity:', marginHorizontal, customerOrderStartHeight + 40)
  .moveDown(0.5)
  .text('20')
// Second column
doc
  .fontSize(fz[3])
  .text('Packaging:', marginHorizontal + 130, customerOrderStartHeight + 40)
  .moveDown(0.5)
  .text('Pallets')
// Third column
doc
  .fontSize(fz[3])
  .text('Address:', docWidth / 2, customerOrderStartHeight + 40)
  .moveDown(0.5)
  .text('Pallets')

// Fourth column
doc
  .fontSize(fz[3])
  .text('Time:', docWidth / 2 + 130, customerOrderStartHeight + 40)
  .moveDown(0.5)
  .text('Pallets')

// END Customer Order

// 
// Signatures
// 

const signaturesStartHeight = 600
const signaturesLineWeight = 0.8

// First column
// First line
const signaturesFirstColumnStartPosition = marginHorizontal
const signaturesFirstColumnEndPosition = docWidthWithMargin / 3
doc // Line
  .moveTo(signaturesFirstColumnStartPosition, signaturesStartHeight)                               // set the current point
  .lineTo(signaturesFirstColumnEndPosition, signaturesStartHeight)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Shipper Signature', signaturesFirstColumnStartPosition, signaturesStartHeight + 8)

// Second line
doc // Line
  .moveTo(signaturesFirstColumnStartPosition, signaturesStartHeight + 50)                               // set the current point
  .lineTo(signaturesFirstColumnEndPosition, signaturesStartHeight + 50)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Date', signaturesFirstColumnStartPosition, signaturesStartHeight + 58)

// Third line
doc // Line
  .moveTo(signaturesFirstColumnStartPosition, signaturesStartHeight + 100)                               // set the current point
  .lineTo((docWidth / 3 - marginHorizontal / 3)/2, signaturesStartHeight + 100)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Time in', signaturesFirstColumnStartPosition, signaturesStartHeight + 108)

doc // Line
  .moveTo(signaturesFirstColumnStartPosition + 90, signaturesStartHeight + 100)                               // set the current point
  .lineTo(docWidth / 3 - marginHorizontal / 3, signaturesStartHeight + 100)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Time out', signaturesFirstColumnStartPosition + 90, signaturesStartHeight + 108)

// Second column
// First line
const signaturesSecondColumnStartPosition = marginHorizontal + docWidthWithMargin / 3 - marginHorizontal/3  
const signaturesSecondColumnEndPosition = (docWidthWithMargin / 3)*2
doc // Line
  .moveTo(signaturesSecondColumnStartPosition, signaturesStartHeight)                               // set the current point
  .lineTo(signaturesSecondColumnEndPosition, signaturesStartHeight)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Shipper Signature', signaturesSecondColumnStartPosition, signaturesStartHeight + 8)

// Second line
doc // Line
  .moveTo(signaturesSecondColumnStartPosition, signaturesStartHeight + 50)                               // set the current point
  .lineTo(signaturesSecondColumnEndPosition, signaturesStartHeight + 50)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Date', signaturesSecondColumnStartPosition, signaturesStartHeight + 58)

// Third column
// First line
const signaturesThirdColumnStartPosition = marginHorizontal + (docWidthWithMargin / 3) * 2 - marginHorizontal / 3  
const signaturesThirdColumnEndPosition = (docWidthWithMargin / 3) * 3
doc // Line
  .moveTo(signaturesThirdColumnStartPosition, signaturesStartHeight)                               // set the current point
  .lineTo(signaturesThirdColumnEndPosition, signaturesStartHeight)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Shipper Signature', signaturesThirdColumnStartPosition, signaturesStartHeight + 8)

// Second line
doc // Line
  .moveTo(signaturesThirdColumnStartPosition, signaturesStartHeight + 50)                               // set the current point
  .lineTo(signaturesThirdColumnEndPosition, signaturesStartHeight + 50)
  .lineWidth(signaturesLineWeight)
  .stroke()
doc
  .fontSize(fz[4])
  .text('Date', signaturesThirdColumnStartPosition, signaturesStartHeight + 58)



// Finalize PDF file
doc.end();

console.log('Success!')