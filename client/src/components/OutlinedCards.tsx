import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        FilmFolio
      </Typography> */}
      <Typography variant="h5" component="div">
        Google
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        www.google.com
      </Typography>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        By Ved Patel
      </Typography>
      {/* <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography> */}
    </CardContent>
    <CardActions>
      <Button href="Deployments/Project1" size="small">
        Check Details
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
