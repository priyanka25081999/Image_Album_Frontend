import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const CreateNewAlbumCard = ({ setDialogOpen }) => {
  return (
    <Card sx={{ cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
      <CardContent sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Avatar
            sx={{
              background: "white",
              color: "black",
              width: "100px",
              height: "100px",
            }}
          >
            <AddIcon sx={{ width: "100px", height: "100px" }} />
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
          Create new album
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CreateNewAlbumCard;
