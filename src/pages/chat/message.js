import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CardMedia, // Import CardMedia for displaying images
  Link, // Import Link for download links
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Message = ({ message, seller, buyer }) => {
  const isAdmin = message.admin === true;
  const isSeller = message.sender_id === seller.id;
  const isBuyer = message.sender_id === buyer.id;
  const isSystem = message.system_message === true;
  const isOrder = message.system_message === false && message.sender_id === null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAdmin ? "flex-end" : isSystem ? "center" : isOrder ? "center" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isAdmin ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: isAdmin
              ? "primary.main"
              : isBuyer
              ? "secondary.main"
              : isSeller
              ? "error.main"
              : "whitesmoke",
          }}
        >
          {isAdmin ? "A" : isBuyer ? "B" : isSeller ? "S" : isSystem ? "" : isOrder ? "" : ""}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isAdmin ? 0 : 1,
            mr: isAdmin ? 1 : 0,
            backgroundColor: isAdmin
              ? "primary.light"
              : isBuyer
              ? "secondary.light"
              : isSeller
              ? "error.light"
              : "gray",
            borderRadius: isAdmin
              ? "20px 20px 5px 20px"
              : "5px 20px 20px 20px",
          }}
        >
          {/* Display message content */}
          <Typography variant="body1">{message.content}</Typography>

          {/* Display attachments if available */}
          {message.attachment && (
            <List>
              {message.attachment.map((attachment, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {attachment.startsWith("http") ? (
                      <CardMedia
                        component="img"
                        alt={`Attachment ${index + 1}`}
                        height="150"
                        image={attachment}
                      />
                    ) : (
                      <Link
                        href={attachment}
                        download
                      >
                        <Typography variant="body2">
                          Download Attachment {index + 1}
                        </Typography>
                      </Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary="" />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;


