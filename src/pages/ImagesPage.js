import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import ImageCard from "../components/cards/ImageCard";

const ImagesPage = (props) => {
  const { id } = useParams();

  // Validate the bucket
  const images = [
    {
      id: 1,
      imageUrl:
        "https://media.istockphoto.com/photos/positive-man-celebrating-success-picture-id1221837116?k=20&m=1221837116&s=612x612&w=0&h=HfTeaCWySduic6zF3kC-jGjWq_JgQUc5BtBjdCzBQzU=",
    },
    {
      id: 2,
      imageUrl:
        "https://media.gettyimages.com/photos/panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal-picture-id1164550537?s=612x612",
    },
    {
      id: 1,
      imageUrl:
        "https://media.istockphoto.com/photos/positive-man-celebrating-success-picture-id1221837116?k=20&m=1221837116&s=612x612&w=0&h=HfTeaCWySduic6zF3kC-jGjWq_JgQUc5BtBjdCzBQzU=",
    },
    {
      id: 2,
      imageUrl:
        "https://media.gettyimages.com/photos/panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal-picture-id1164550537?s=612x612",
    },
  ];
  return (
    <Box>
      <Navbar isCreateAlbumAllowed={false} />
      {/* <div>ImagesPage: {id}</div> */}

      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {images.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ImageCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ImagesPage;
