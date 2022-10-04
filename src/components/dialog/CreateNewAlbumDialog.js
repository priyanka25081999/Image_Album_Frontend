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
  Snackbar,
  Alert,
} from "@mui/material";
import { v4 } from "uuid";
import { ALBUM_BACKEND } from "../../contants/Backend";
import axios from "axios";
import React from "react";

const CreateNewAlbumDialog = ({ setAlbums, dialogOpen, setDialogOpen }) => {
  const [albumName, setAlbumName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");

  const addNewAlbum = async (e) => {
    e.preventDefault();

    if (albumName.trim() === "") return window.alert("Please Enter Album Name");

    const re = /^[a-z0-9]+$/;
    const compare_result = re.test(albumName);

    console.log("Is Bucket Name Valid: ", compare_result);

    if (!compare_result) {
      setSeverity("error");
      setMessage("Please enter valid album name");
      setOpen(true);
      return console.log("Please enter valid album name");
    }
    const unique = v4().split("-")[0];

    const final_album_name = albumName + "-" + unique;

    console.log(final_album_name);

    await axios
      .put(ALBUM_BACKEND + `/album/?bucket=${final_album_name}`)
      .then((res) => {
        console.log("Res: ", res);

        const { data } = res;
        if (data.isDone) {
          setAlbums((preVal) => [
            {
              id: v4(),
              Name: final_album_name,
            },
            ...preVal,
          ]);
          setAlbumName("");
          setDialogOpen(false);

          setSeverity("success");
          setMessage("Album Created Successfully!");
          setOpen(true);
        } else {
          setSeverity("error");
          setMessage("Album Not Created!");
          setOpen(true);
        }
        return;
      })
      .catch((err) => {
        console.log("Err: ", err);
        setSeverity("error");
        setMessage(err.message);
        setOpen(true);
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
    </>
  );
};

export default CreateNewAlbumDialog;
