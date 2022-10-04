import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ImageCard from "../components/cards/ImageCard";
import CircularProgress from "@mui/material/CircularProgress";
import { IMAGE_BACKEND } from "../contants/Backend";
import UploadImageDialog from "../components/dialog/UploadImageDialog";

const ImagesPage = (props) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(IMAGE_BACKEND + `/image/?bucket=${name}`)
      .then((res) => {
        console.log("Res: ", res);
        const { data } = res;

        setImages([]);
        // Process Data
        if (data.isDone) {
          data.result.map((item, index) => {
            console.log(item);
            const local = {
              Key: item.Key,
              Size: item.Size,
              LastModified: item.LastModified,
            };
            setImages((prevData) => [...prevData, local]);
          });
        }

        setIsLoading(false);
      })
      .catch((err) => {
        if (
          err.response.data.error.message ===
          "The specified bucket does not exist"
        ) {
          navigate("/");
        }
        console.log("Err: ", err.response.data.error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          widht: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <UploadImageDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        bucket={name}
      />
      <Navbar
        isCreateAlbumAllowed={false}
        isUploadImageAllowed={true}
        setDialogOpen={setDialogOpen}
      />
      {/* <div>ImagesPage: {id}</div> */}

      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {images.length !== 0 ? (
            images
              .sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.LastModified) - new Date(a.LastModified);
              })
              .map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ImageCard
                    item={item}
                    bucketName={name}
                    setImages={setImages}
                  />
                </Grid>
              ))
          ) : (
            <Typography variant="h6">Images Not Found</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ImagesPage;
