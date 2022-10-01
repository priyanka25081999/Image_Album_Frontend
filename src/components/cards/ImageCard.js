import { Card, CardMedia } from "@mui/material";
import React from "react";
const ImageCard = ({ item }) => {
  return (
    <Card sx={{ height: "100%", minHeight: "200px" }}>
      <CardMedia component="img" height="100%" image={item.imageUrl} />
    </Card>
  );
};

export default ImageCard;
