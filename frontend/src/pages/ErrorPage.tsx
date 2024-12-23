import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="error">
        Oops! Something went wrong.
      </Typography>
    </Box>
  );
};

export default ErrorPage;
