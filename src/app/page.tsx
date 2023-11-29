"use client";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Spreadsheet, { Matrix } from "react-spreadsheet";
import { Email } from "../components/email";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const [fileInputState, setFileInputState] = useState<ArrayBuffer | null>(
    null
  );
  const [editedFile, setEditedFile] = useState<ArrayBuffer | string | null>(
    fileInputState
  );
  const [editedFileBytes, setEditedFileBytes] = useState(fileInputState);
  const [open, setOpen] = useState(false);

  const [xPosition, setXPosition] = useState<string>("306");
  const [yPosition, setYPosition] = useState<string>("400");

  const [xDataPosition, setXDataPosition] = useState<string>("206");
  const [yDataPosition, setYDataPosition] = useState<string>("200");

  const [hourXposition, setHourXposition] = useState<string>("306");
  const [hourYposition, setHourYposition] = useState<string>("306");

  const [fontSize, setFontSize] = useState<string>("14");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const modifyPdf = useCallback(async () => {
    if (fileInputState !== null) {
      const existingPdfBytes = fileInputState;
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      firstPage.drawText("Name", {
        x: Number(xPosition),
        y: Number(yPosition),
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText("Date", {
        x: Number(xDataPosition),
        y: Number(yDataPosition),
        size: Number(fontSize),
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText("Hour", {
        x: Number(hourXposition),
        y: Number(hourYposition),
        size: Number(fontSize),
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      const bytes = new Uint8Array(pdfBytes);
      setEditedFileBytes(bytes);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const docUrl = URL.createObjectURL(blob);
      setEditedFile(docUrl);
    }
  }, [
    xPosition,
    yPosition,
    fileInputState,
    yDataPosition,
    xDataPosition,
    hourXposition,
    hourYposition,
    fontSize,
  ]);

  useEffect(() => {
    modifyPdf();
  }, [fileInputState, modifyPdf]);

  const handleModify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileInputState(await e.target.files[0].arrayBuffer());
    }
    modifyPdf();
  };

  const [data, setData] = useState<Matrix<{ value: string }>>([
    [
      { value: "Emails" },
      { value: "Names" },
      { value: "Date" },
      { value: "Hour" },
    ],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
  ]);

  if (isAuthenticated) {
    return (
      <div className="h-full  container mx-auto px-4">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="span">
              Enter the data
            </Typography>
            <Typography id="modal-modal-description">
              <div className="">
                <div className="overflow-y-auto h-[70vh]">
                  <Spreadsheet
                    data={data}
                    onChange={setData}
                    hideRowIndicators={true}
                  />
                </div>
                <Button
                  className="absolute bottom-2 right-0"
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(false)}
                >
                  Done
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
        <h1>Choose a file</h1>
        <input type="file" onChange={handleModify} />
        <div className="px-4">
          <div className="w-full">
            <div className="flex pt-6 pb-2 gap-4 md:flex-row flex-col">
              <TextField
                id="outlined-basic"
                label="Vertical position of name"
                variant="outlined"
                type="number"
                value={yPosition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYPosition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Horizontal position of name"
                variant="outlined"
                type="number"
                value={xPosition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setXPosition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Vertical position of date"
                variant="outlined"
                type="number"
                value={yDataPosition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYDataPosition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Horizontal position of date"
                variant="outlined"
                type="number"
                value={xDataPosition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setXDataPosition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Horizontal position of hour"
                variant="outlined"
                type="number"
                value={hourXposition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHourXposition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Vertical position of hour"
                variant="outlined"
                type="number"
                value={hourYposition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHourYposition(e.target.value)
                }
              />
              <TextField
                id="outlined-basic"
                label="Font size"
                variant="outlined"
                type="number"
                value={fontSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFontSize(e.target.value)
                }
              />
              <Button variant="contained" size="large" onClick={modifyPdf}>
                Modify
              </Button>
            </div>
            {editedFile && typeof editedFile === "string" && (
              <iframe
                height="500px"
                width="100%"
                className="w-full"
                src={editedFile}
              />
            )}
          </div>
          <div className="flex flex-row justify-between xl:pr-5">
            <Button variant="outlined" onClick={() => setOpen(true)}>Open spreadsheet</Button>

            <Email
              xName={xPosition}
              yName={yPosition}
              xDate={xDataPosition}
              yDate={yDataPosition}
              data={data}
              fileInputState={fileInputState}
              hourXposition={hourXposition}
              hourYposition={hourYposition}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    );
  } 
}
