import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { routes as appRoutes } from "./routes";

function App() {
  return (
    <>
      <CssBaseline />

      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar />
          <Routes>
            {appRoutes.map((route) => (
              <Route key={route.key} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
