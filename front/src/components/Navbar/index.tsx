import { Box, Container, Toolbar, Typography, IconButton, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        mt: 0,
        mr: "auto",
        pt: "2rem",
        pr: "1rem",
        pd: "12rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { md: "flex" },
            }}
          >
            Insights
          </Typography>
          <Link component={NavLink} to={"/new"} color="black" underline="none" variant="button">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </Container>
    </Box>
  );
}
