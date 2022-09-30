import { Box, Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CreateNewAlbumCard from "../../components/cards/CreateNewAlbumCard";

const DashboardPage = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      <Container maxWidth="xl" sx={{ my: 3 }}>
        {/*  */}
        <CreateNewAlbumCard />
      </Container>
    </Box>
  );
};

export default DashboardPage;
