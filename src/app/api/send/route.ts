import { HTML } from "@/utils/html";
import { NextRequest } from "next/server";
import { Matrix } from "react-spreadsheet";
const nodemailer = require("nodemailer");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

export async function POST(req: NextRequest) {
  const body = await req.json();

  const data: Matrix<{ value: string }> = JSON.parse(body.dataJson);
  await Promise.all(
    data.slice(1).map(async (el) => {
      if (el[0] && el[0].value !== "" && el[1] && el[1].value !== "") {
        //modify pdf
        const existingPdfBytes = body.b64;

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        firstPage.drawText(data[1][2]?.value, {
          //date
          x: Number(body.xDate),
          y: Number(body.yDate),
          size: Number(body.fontSize),
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        firstPage.drawText(el[1].value, {
          //name
          x: Number(body.xName),
          y: Number(body.yName),
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(data[1][3]?.value, {
          //hour
          x: Number(body.hourXposition),
          y: Number(body.hourYposition),
          size: Number(body.fontSize),
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        const bytes = new Uint8Array(pdfBytes);

        // send email
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.NEXT_PUBLIC_EMAIL, // sender address
          to: el[0].value, // list of receivers
          subject: "YOUR CERTIFICATE HAS ARRIVED!",
          html: HTML,

          attachments: [
            {
              // encoded string as an attachment
              filename: "certificado.pdf",
              content: bytes,
            },
          ],
        });
      }
    })
  );
  return Response.json({ response: "Ok" }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2000mb", // Set desired value here
    },
  },
};
