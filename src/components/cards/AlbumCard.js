import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AlbumCard = ({ item }) => {
  return (
    <Card sx={{ height: "100%", minHeight: "200px" }}>
      <CardContent>
        <Typography variant="h5">{item.albumName}</Typography>
        <Typography variant="body1">{item.albumDescription}</Typography>
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
