import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import useSongs from "../hooks/useSongs";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../components/Layout";
import PageSpinner from "../components/PageSpinner";

export interface ISongPageProps {
  tab?: number;
  archived?: boolean;
  setState: (args: Partial<ISongPageProps>) => void;
}

const enum Category {
  A = "Category A",
  B = "Category B (Hymn)",
}

const SongsPage: React.FC<ISongPageProps> = ({
  tab = 0,
  archived = false,
  setState,
}) => {
  const [songs, error, loading] = useSongs({ archived });
  const navigate = useNavigate();
  const handleTabChange = (i) => setState({ tab: i, archived: i >= 2 });

  const isCatA = tab === 0 || tab === 2;
  const filteredSongs = songs.filter((song) =>
    song.tags?.includes(isCatA ? Category.A : Category.B)
  );

  return (
    <PageSpinner loading={loading}>
      <div style={{ margin: "3rem 0" }}>
        <Paper square elevation={3} style={{ margin: "1.5rem 0" }}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(_, i) => handleTabChange(i)}
            aria-label="disabled tabs example"
          >
            <Tab label="Category A" />
            <Tab label="Hymns" />
            <Tab label="Archived Songs" />
            <Tab label="Archived Hymns" />
          </Tabs>
        </Paper>

        {error && <p>{error}</p>}
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span>Title</span>
                </TableCell>
                <TableCell align="right">Artist</TableCell>
                <TableCell align="right">Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow
                  key={song.id}
                  onClick={() => navigate(ROUTES.songDetail(song.id))}
                >
                  <TableCell component="th" scope="song">
                    {song.title}
                  </TableCell>
                  <TableCell align="right">{song.author}</TableCell>
                  <TableCell align="right">{song.key}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageSpinner>
  );
};

export default SongsPage;
