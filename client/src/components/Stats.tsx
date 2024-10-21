import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Stats() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item>Up Time</Item>
        </Grid>
        <Grid size={6}>
          <Item>Response Time</Item>
        </Grid>
        <Grid size={6}>
          <Item>SSL</Item>
        </Grid>
        <Grid size={6}>
          <Item>Domain</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
