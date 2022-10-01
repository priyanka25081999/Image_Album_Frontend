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
  Typography,
} from "@mui/material";
import React from "react";
import { v4 } from "uuid";

const CreateNewAlbumDialog = ({ setAlbums, dialogOpen, setDialogOpen }) => {
  const [albumName, setAlbumName] = React.useState("");

  const addNewAlbum = (e) => {
    e.preventDefault();

    if (albumName.trim() === "") return window.alert("Please Enter Album Name");

    setAlbums((preVal) => {
      preVal.push({
        id: v4(),
        albumName: albumName,
      });
      return preVal;
    });

    setAlbumName("");
    setDialogOpen(false);
  };

  return (
    <Dialog maxWidth={"lg"} open={dialogOpen}>
      <form onSubmit={(e) => addNewAlbum(e)}>
        <DialogTitle>Add a New Image Album</DialogTitle>
        <DialogContent>
          {/* Form */}
          <Box sx={{ width: "400px" }}>
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
                <Typography sx={{ mt: 2 }} variant="body2">
                  Only alphabets, digits and - is allowed
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateNewAlbumDialog;
