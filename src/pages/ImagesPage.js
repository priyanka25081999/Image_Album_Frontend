import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ImageCard from "../components/cards/ImageCard";
import CircularProgress from "@mui/material/CircularProgress";
import { BACKEND_URL } from "../contants/Backend";

const ImagesPage = (props) => {
  const { name } = useParams();
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(BACKEND_URL + `/image/?bucket=${name}`)
      .then((res) => {
        console.log("Res: ", res);
        const { data } = res;

        setImages([]);
        // Process Data
        if (data.isDone) {
          data.result.map((item, index) => {
            console.log(item);
            const local = {
              name: item.key,
            };
            setImages((prevData) => [...prevData, local]);
          });
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Err: ", err.response);
        setIsLoading(false);
      });
  }, []);
  // Validate the bucket
  // const images = [
  //   {
  //     id: 1,
  //     imageUrl:
  //       "https://media.istockphoto.com/photos/positive-man-celebrating-success-picture-id1221837116?k=20&m=1221837116&s=612x612&w=0&h=HfTeaCWySduic6zF3kC-jGjWq_JgQUc5BtBjdCzBQzU=",
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       "https://media.gettyimages.com/photos/panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal-picture-id1164550537?s=612x612",
  //   },
  //   {
  //     id: 1,
  //     imageUrl:
  //       "https://media.istockphoto.com/photos/positive-man-celebrating-success-picture-id1221837116?k=20&m=1221837116&s=612x612&w=0&h=HfTeaCWySduic6zF3kC-jGjWq_JgQUc5BtBjdCzBQzU=",
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       "https://media.gettyimages.com/photos/panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal-picture-id1164550537?s=612x612",
  //   },
  // ];

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
      <Navbar isCreateAlbumAllowed={false} />
      {/* <div>ImagesPage: {id}</div> */}

      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {images.length !== 0 ? (
            images.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ImageCard item={item} />
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
