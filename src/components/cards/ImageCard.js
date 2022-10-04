import {
  Card,
  CardMedia,
  CardHeader,
  IconButton,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { IMAGE_BACKEND } from "../../contants/Backend";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ImageCard = ({ item, bucketName, setImages }) => {
  console.log("Item: ", item);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    axios
      .delete(IMAGE_BACKEND + `/image/?bucket=${bucketName}&key=${item.Key}`)
      .then((res) => {
        const { data } = res;
        if (data.isDone) {
          setImages((prevData) => {
            return prevData.filter((fiter_item) => fiter_item.Key !== item.Key);
          });
          setSeverity("success");
          setMessage("Image Successfully Deleted");
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSeverity("error");
        setMessage("Image Not Deleted");
        setOpen(true);
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Card sx={{ height: "350px" }}>
        <CardHeader
          sx={{ borderBottom: "2px solid #ddd" }}
          action={
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          }
          title={
            <Typography
              variant="body1"
              sx={{
                textOverflow: "ellipsis",
                width: "150px",
                overflow: "hidden",
              }}
            >
              {item.Key}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="100%"
          image={"https://" + bucketName + ".s3.amazonaws.com/" + item.Key}
        />
      </Card>
    </>
  );
};

export default ImageCard;
