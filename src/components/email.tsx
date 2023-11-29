"use client"
import { Alert, Button, Snackbar } from "@mui/material";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";
import { useState } from "react";
import { Matrix } from "react-spreadsheet";

type Props = {
  xName: string;
  yName: string;
  xDate: string;
  yDate: string;
  data: Matrix<{ value: string }>;
  fileInputState: ArrayBuffer | null;
  hourXposition: string;
  hourYposition: string;
  fontSize: string;
};

export const Email = ({
  xName,
  yName,
  xDate,
  yDate,
  data,
  fileInputState,
  hourXposition,
  hourYposition,
  fontSize,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    function _arrayBufferToBase64(buffer: ArrayBuffer | null) {
      if (buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
    }

    const formData = new FormData();

    const b64 = _arrayBufferToBase64(fileInputState);

    b64 && formData.append("base", b64);

    if (fileInputState !== null) {
      const dataJson = JSON.stringify(data);
      try {
        setLoading(true);
        const res = await axios.post("/api/send", {
          b64,
          dataJson,
          xName,
          yName,
          xDate,
          yDate,
          hourXposition,
          hourYposition,
          fontSize,
        });

        console.log(res);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      setOpen(true);
    }

    //download all files

    data.slice(1).map(async (el) => {
      if (
        el[1] &&
        el[0] &&
        el[0].value !== "" &&
        el[1].value !== "" &&
        fileInputState
      ) {
        const existingPdfBytes = fileInputState;

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        data[1][2] &&
          firstPage.drawText(data[1][2].value, {
            //date
            x: Number(xDate),
            y: Number(yDate),
            size: Number(fontSize),
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });

        firstPage.drawText(el[1].value, {
          //name
          x: Number(xName),
          y: Number(yName),
          size: 16,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        el[3] &&
          firstPage.drawText(el[3].value, {
            //hour
            x: Number(hourXposition),
            y: Number(hourYposition),
            size: Number(fontSize),
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });

        const pdfBytes = await pdfDoc.save();

        const bytes = new Uint8Array(pdfBytes);
        const blob = new Blob([bytes], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", el[1].value + ".pdf");
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  //snackbar
  const [open, setOpen] = useState(false);

  return (
    <div>
      {loading && (
        <div className="status absolute z-20 top-0 right-0 left-0 h-screen w-full flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Done!
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        size="large"
        className="pt-2"
        onClick={sendEmail}
      >
        Send
      </Button>
    </div>
  );
};
