import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";
import axios from "axios";
import { IMAGE_BACKEND } from "../../contants/Backend";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 70px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#bbb",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadImageDialog = ({ dialogOpen, setDialogOpen, bucket }) => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] } });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const uploadFiles = () => {
    setIsUploading(true);
    acceptedFiles.map((item, index) => {
      const formData = new FormData();
      formData.append("file", item);
      formData.append("fileName", item.name);
      formData.append("bucket", bucket);

      axios
        .post(IMAGE_BACKEND + "/image/", formData)
        .then((res) => {
          console.log("FILE UPLOAD: ", res);
          setSeverity("success");
          setMessage(item.name + " Uploaded Successfully!");
          setOpen(true);
          if (index === acceptedFiles.length - 1) {
            setIsUploading(false);
          }
        })
        .catch((err) => {
          console.log("FILE UPLOAD ERROR: ", err);
          setSeverity("success");
          setMessage(item.name + " Not Uploaded");
          setOpen(true);
          if (index === acceptedFiles.length - 1) {
            setIsUploading(false);
          }
          return;
        });
    });
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Dialog maxWidth="lg" open={dialogOpen}>
        <DialogTitle>Upload Photos</DialogTitle>
        <DialogContent>
          {/* Form */}
          <Box>
            <Grid container spacing={2}>
              {/* Upload */}
              <Grid
                item
                xs={12}
                sx={{ display: isUploading ? "none" : "block" }}
              >
                <Box {...getRootProps({ className: "dropzone", style })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </Box>
              </Grid>
              {acceptedFiles.length > 0 ? (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Files
                  </Typography>

                  <List>
                    {acceptedFiles.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ImageIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.path} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant="contained"
                    onClick={() => uploadFiles()}
                    disableElevation
                    disabled={isUploading}
                  >
                    Upload
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadImageDialog;
