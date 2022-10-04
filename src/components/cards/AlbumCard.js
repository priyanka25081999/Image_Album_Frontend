import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGES_PAGE_URL } from "../../contants/Urls";
import { ALBUM_BACKEND } from "../../contants/Backend";
import React from "react";
import axios from "axios";

const AlbumCard = ({ item, setAlbums }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteBucket = async () => {
    setIsDeleting(true);
    await axios
      .delete(ALBUM_BACKEND + `/album/?bucket=${item.Name}`)
      .then((res) => {
        console.log("Res: ", res);

        const { data } = res;

        if (data.isDone) {
          setSeverity("success");
          setMessage("Album Successfully Deleted");
          setOpen(true);
          setAlbums((prevData) => {
            return prevData.filter(
              (prevData_item) => prevData_item.Name !== item.Name
            );
          });
        }
        setIsDeleting(false);
      })
      .catch((err) => {
        if (
          err.response.data.error.message ===
          "The bucket you tried to delete is not empty"
        ) {
          setSeverity("error");
          setMessage("The album you tried to delete is not empty");
          setOpen(true);
        }
        setIsDeleting(false);
        console.log("Err: ", err);
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
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1, flexGrow: 1 }}>
          <Typography variant="h5">{item.Name}</Typography>
          <Typography variant="body2">{item.CreationDate}</Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={() => navigate(IMAGES_PAGE_URL + "/" + item.Name)}
                disableElevation
                fullWidth
              >
                Explore
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                onClick={deleteBucket}
                disableElevation
                fullWidth
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default AlbumCard;
