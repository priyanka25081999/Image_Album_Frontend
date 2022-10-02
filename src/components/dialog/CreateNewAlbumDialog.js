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
import { v4 } from "uuid";
import { IMAGE_BACKEND } from "../../contants/Backend";
import axios from "axios";
import React from "react";

const CreateNewAlbumDialog = ({ setAlbums, dialogOpen, setDialogOpen }) => {
  const [albumName, setAlbumName] = React.useState("");

  const addNewAlbum = async (e) => {
    e.preventDefault();

    if (albumName.trim() === "") return window.alert("Please Enter Album Name");

    const re = /^[a-z0-9]+$/;
    const compare_result = re.test(albumName);

    console.log("Is Bucket Name Valid: ", compare_result);

    if (!compare_result) {
      return console.log("Please enter valid album name");
    }
    const unique = v4().split("-")[0];

    const final_album_name = albumName + "-" + unique;

    console.log(final_album_name);

    await axios
      .put(IMAGE_BACKEND + `/album/?bucket=${final_album_name}`)
      .then((res) => {
        console.log("Res: ", res);
        setAlbums((preVal) => [
          {
            id: v4(),
            Name: final_album_name,
          },
          ...preVal,
        ]);
        setAlbumName("");
        setDialogOpen(false);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
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
                  Only lowercase alphabets and digits are allowed
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
