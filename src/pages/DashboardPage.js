import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import CreateNewAlbumCard from "../components/cards/CreateNewAlbumCard";
import CreateNewAlbumDialog from "../components/dialog/CreateNewAlbumDialog";
import AlbumCard from "../components/cards/AlbumCard";

const DashboardPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [albums, setAlbums] = React.useState([]);

  return (
    <Box>
      <CreateNewAlbumDialog
        setAlbums={setAlbums}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />

      {/* Navbar */}
      <Navbar
        isCreateAlbumAllowed={true}
        albums={albums}
        setDialogOpen={setDialogOpen}
      />

      <Container maxWidth="xl" sx={{ my: 3 }}>
        {/*  */}
        <Grid container spacing={3}>
          {albums.length === 0 ? (
            <Grid item xs={12} sm={6} md={3}>
              <CreateNewAlbumCard setDialogOpen={setDialogOpen} />
            </Grid>
          ) : (
            albums.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <AlbumCard item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
