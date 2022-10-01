import { Box, Container, Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import AlbumCard from "../components/cards/AlbumCard";
import Navbar from "../components/navbar/Navbar";
import CreateNewAlbumCard from "../components/cards/CreateNewAlbumCard";
import CreateNewAlbumDialog from "../components/dialog/CreateNewAlbumDialog";
import CircularProgress from "@mui/material/CircularProgress";
import { BACKEND_URL } from "../contants/Backend";

const DashboardPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [albums, setAlbums] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(BACKEND_URL + "/album/")
      .then((res) => {
        console.log("Res: ", res);
        const { data } = res;

        if (data.isDone) setAlbums([...data.buckets]);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Err: ", err);
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
