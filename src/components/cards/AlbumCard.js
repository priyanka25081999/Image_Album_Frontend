import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGES_PAGE_URL } from "../../contants/Urls";
import { BACKEND_URL } from "../../contants/Backend";
import React from "react";
import axios from "axios";

const AlbumCard = ({ item, setAlbums }) => {
  const navigate = useNavigate();

  const deleteBucket = async () => {
    await axios
      .delete(BACKEND_URL + `/album/?bucket=${item.Name}`)
      .then((res) => {
        console.log("Res: ", res);

        const { data } = res;

        if (data.isDone) {
          setAlbums((prevData) => {
            return prevData.filter(
              (prevData_item) => prevData_item.Name !== item.Name
            );
          });
        }
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  return (
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
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default AlbumCard;
