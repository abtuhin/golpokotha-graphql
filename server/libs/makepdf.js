const fs = require("fs");
const fonts = require("../../fonts");
const PdfPrinter = require("pdfmake/src/printer");
const printer = new PdfPrinter(fonts);

const styles = {
  header: {
    fontSize: 24,
    bold: true,
    lineHeight: 1.5,
    marginTop: 5,
    alignment: "center"
  },
  content: {
    fontSize: 14,
    letterSpacing: 2,
    lineHeight: 1.2,
    marginBottom: 8,
    alignment: "justify"
  }
};

module.exports = {
  generatePdf: (storyTitle = "", data = []) => {
    let doc = {
      content: data,
      styles: styles
    };
    let pdfDoc = printer.createPdfKitDocument(doc);
    let story = `${new Date().toISOString()}.${storyTitle}.pdf`;
    try {
      pdfDoc
        .pipe(fs.createWriteStream(`./uploads/files/` + story))
        .on("finish", function() {
          console.log("successful");
        });
      pdfDoc.end();
      return story;
    } catch (e) {
      console.log(e);
      return new Error("Pdf generate error", e);
    }
  }
};
