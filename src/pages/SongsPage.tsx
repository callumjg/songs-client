import React, { useState } from "react";
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
import useSongHistory from "../hooks/useSongHistory";
import { Song } from "../apis/songs-api";
import moment from "moment";
import { TableSortLabel } from "@material-ui/core";

export interface ISongPageProps {
  tab?: number;
  archived?: boolean;
  setState: (args: Partial<ISongPageProps>) => void;
}

const enum Category {
  A = "Category A",
  B = "Category B (Hymn)",
}

interface IHeaderCell {
  display: string;
  id: string;
  align?: "left" | "right";
  sort?: (a: Song, b: Song) => number;
}
const tableHeaderCells: IHeaderCell[] = [
  {
    display: "Title",
    id: "Title",
  },
];

const SongsPage: React.FC<ISongPageProps> = ({
  tab = 0,
  archived = false,
  setState,
}) => {
  const [songs, error, loading] = useSongs({ archived });
  const [songHistory, songHistoryError, songHistoryLoading] = useSongHistory();
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >();
  const [sortFn, setSortFn] = useState<
    ((a: Song, b: Song) => number) | undefined
  >();
  const navigate = useNavigate();
  const handleTabChange = (i) => setState({ tab: i, archived: i >= 2 });

  const isCatA = tab === 0 || tab === 2;
  const filteredSongs = songs.filter((song) =>
    song.tags?.includes(isCatA ? Category.A : Category.B)
  );

  const sortedSongs = !sortFn ? filteredSongs : filteredSongs.sort(sortFn);
  const getWksSincePlayed = (song: Song): number | undefined => {
    const services = songHistory[song.id || ""] || [];
    if (!services[0]) {
      return;
    }
    const today = moment();
    const lastService = moment(services[0]);
    return today.diff(lastService, "week");
  };

  const getNumOfPlays = (song: Song): number => {
    const today = moment();
    const sixMonthsAgo = today.subtract(6, "months");
    const services = (songHistory[song.id || ""] || []).filter((s) =>
      moment(s).isAfter(sixMonthsAgo)
    );
    return services.length;
  };

  const handleSortChange = (cell: IHeaderCell) => () => {
    setSortDirection((order) =>
      order === "asc" && sortBy === cell.id ? "desc" : "asc"
    );
    setSortBy(cell.id);
    setSortFn(cell.sort);
  };

  return (
    <PageSpinner loading={loading || songHistoryLoading}>
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
        {songHistoryError && <p>{songHistoryError}</p>}
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaderCells.map((cell) => (
                  <TableCell
                    align={cell.align}
                    key={cell.id}
                    sortDirection={
                      sortBy === cell.id ? sortDirection : undefined
                    }
                  >
                    <TableSortLabel
                      active={sortBy === cell.id}
                      direction={sortBy === cell.id ? sortDirection : undefined}
                      onClick={handleSortChange(cell)}
                    >
                      {cell.display}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {/* <TableCell>
                  <TableSortLabel>Title</TableSortLabel>
                </TableCell> */}
                <TableCell align="right">Artist</TableCell>
                <TableCell align="right">Plays last 6mths</TableCell>
                <TableCell align="right">Wks since played</TableCell>
                <TableCell align="right">Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSongs.map((song) => (
                <TableRow
                  key={song.id}
                  onClick={() => navigate(ROUTES.songDetail(song.id))}
                >
                  <TableCell component="th" scope="song">
                    {song.title}
                  </TableCell>
                  <TableCell align="right">{song.author}</TableCell>
                  <TableCell align="right">{getNumOfPlays(song)}</TableCell>
                  <TableCell align="right">{getWksSincePlayed(song)}</TableCell>
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
