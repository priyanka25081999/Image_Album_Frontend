import { Card, CardMedia } from "@mui/material";
import React from "react";
const ImageCard = ({ item, bucketName }) => {
  console.log("Item: ", item);
  return (
    <Card sx={{ height: "300px" }}>
      <CardMedia
        component="img"
        height="100%"
        image={"https://" + bucketName + ".s3.amazonaws.com/" + item.Key}
      />
    </Card>
  );
};

export default ImageCard;
