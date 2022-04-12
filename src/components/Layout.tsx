import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React from "react";

export const ROUTES = {
  songs: "/",
  services: "/services",
  songDetail: (id?: number) => `/songs/${id || ":id"}`,
};

const links = [
  {
    title: "Songs",
    path: ROUTES.songs,
  },
  {
    title: "Services",
    path: ROUTES.services,
  },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GPC Songs</Typography>
          <div style={{ flex: 1 }}></div>
          <div>
            {links.map(({ title, path }) => (
              <Button onClick={() => navigate(path)} color="inherit">
                {title}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
};
export default Layout;
