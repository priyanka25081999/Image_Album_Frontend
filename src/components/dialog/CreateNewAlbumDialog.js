import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";
import { v4 } from "uuid";

const CreateNewAlbumDialog = ({ setAlbums, dialogOpen, setDialogOpen }) => {
  const [albumName, setAlbumName] = React.useState("");
  const [albumDescription, setAlbumDescription] = React.useState("");

  const addNewAlbum = () => {
    if (albumName.trim() === "") return window.alert("Please Enter Album Name");

    setAlbums((preVal) => {
      preVal.push({
        id: v4(),
        albumName: albumName,
        albumDescription: albumDescription,
      });
      return preVal;
    });

    setAlbumName("");
    setAlbumDescription("");
    setDialogOpen(false);
  };

  return (
    <Dialog maxWidth={"lg"} open={dialogOpen}>
      <DialogTitle>Add a New Image Album</DialogTitle>
      <DialogContent>
        {/* Form */}
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <FormControl sx={{ mt: 1, width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Album Name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mt: 3, width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Album Description"
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                  multiline
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Close</Button>
        <Button onClick={() => addNewAlbum()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewAlbumDialog;
