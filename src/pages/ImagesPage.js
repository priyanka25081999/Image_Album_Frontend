import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import Navbar from "../components/navbar/Navbar";

const ImagesPage = (props) => {
  const { id } = useParams();

  // Validate the bucket

  return (
    <Box>
      <Navbar isCreateAlbumAllowed={false} />
      <div>ImagesPage: {id}</div>
    </Box>
  );
};

export default ImagesPage;
