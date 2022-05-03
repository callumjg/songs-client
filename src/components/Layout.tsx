import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {
  AppBar,
  Button,
  CircularProgress,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./Layout.scss";
import api from "../apis/api";
import ServicesProvider, { ServicesContext } from "./ServicesProvider";

export const ROUTES = {
  songs: "/",
  services: "/services",
  songDetail: (id?: string) => `/songs/${id || ":id"}`,
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

  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const servicesProvider = useContext(ServicesContext);

  const sync = async () => {
    try {
      setSyncing(true);
      await api.post("/services/sync");
      servicesProvider.expireAll();

      setMessage("Successfully synced services!");
    } catch (err) {
      setMessage("Failed to sync services");
    } finally {
      setSyncing(false);
    }
  };

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
            <Tooltip title="Syncs data with google sheet">
              <Button onClick={sync} disabled={syncing}>
                <span style={{ marginRight: syncing ? "0.5rem" : undefined }}>
                  Sync
                </span>
                {syncing && <CircularProgress color="inherit" size={"1rem"} />}
              </Button>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ flex: "1" }}>{children}</Container>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(undefined)}
        message={message}
      ></Snackbar>
    </div>
  );
};
export default Layout;
