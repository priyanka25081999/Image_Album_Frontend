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
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../contants/Backend";

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
    acceptedFiles.map((item, index) => {
      const formData = new FormData();
      formData.append("file", item);
      formData.append("fileName", item.name);
      formData.append("bucket", bucket);

      axios
        .post(BACKEND_URL + "/image/", formData)
        .then((res) => {
          console.log("FILE UPLOAD: ", res);
        })
        .catch((err) => {
          console.log("FILE UPLOAD ERROR: ", err);
        });
    });
  };
  return (
    <Dialog maxWidth="lg" open={dialogOpen}>
      <DialogTitle>Upload Photos</DialogTitle>
      <DialogContent>
        {/* Form */}
        <Box>
          <Grid container spacing={2}>
            {/* Upload */}
            <Grid item xs={12}>
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
  );
};

export default UploadImageDialog;
