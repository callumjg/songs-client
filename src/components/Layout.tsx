import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Layout.scss";

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
    <div className="sc-layout-container">
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">GPC Songs</Typography>
          <div style={{ flex: 1 }}></div>
          <div>
            {links.map(({ title, path }) => (
              <Button key={path} onClick={() => navigate(path)} color="inherit">
                {title}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ flex: "1" }}>{children}</Container>
    </div>
  );
};
export default Layout;
