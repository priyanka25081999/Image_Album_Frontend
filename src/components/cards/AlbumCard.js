import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IMAGES_PAGE_URL } from "../../contants/Urls";

const AlbumCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ height: "100%", minHeight: "200px", cursor: "pointer" }}
      onClick={() => navigate(IMAGES_PAGE_URL + "/" + item.id)}
    >
      <CardContent>
        <Typography variant="h5">{item.albumName}</Typography>
        <Typography variant="body1">{item.albumDescription}</Typography>
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
