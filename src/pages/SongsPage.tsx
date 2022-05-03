import React, { useMemo } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";

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

type SortDirection = 1 | -1 | undefined;

interface SongWithMetrics extends Song {
  playsLast6Months?: number;
  wksSincePlayed?: number;
}

type SortFn = (
  dir: SortDirection
) => ((a: SongWithMetrics, b: SongWithMetrics) => number) | undefined;
export interface SongPageProps {
  tab?: number;
  archived?: boolean;
  sortBy?: string | undefined;
  sortDirection?: SortDirection;
  sortFn?: SortFn;
  setState: (args: Partial<SongPageProps>) => void;
}

const enum Category {
  A = "Category A",
  B = "Category B (Hymn)",
}

interface SongTableHeaderCell {
  display: string;
  id: string;
  align?: "left" | "right";
  sort?: SortFn;
}

const sortByStrings = (a: string | undefined, b: string | undefined): number =>
  (a?.toLowerCase() || "") > (b?.toLowerCase() || "") ? 1 : -1;

const sortByNumbers = (a: number | undefined, b: number | undefined): number =>
  (a || 0) - (b || 0);

const tableHeaderCells: SongTableHeaderCell[] = [
  {
    display: "Title",
    id: "Title",
    sort: (dir) => (a, b) => (dir || 1) * sortByStrings(a.title, b.title),
  },
  {
    display: "Artist",
    id: "Artist",
    sort: (dir) => (a, b) => (dir || 1) * sortByStrings(a.author, b.author),
    align: "right",
  },
  {
    display: "Plays last 6mths",
    id: "Plays last 6mths",
    sort: (dir) => (a, b) =>
      (dir || 1) * sortByNumbers(a.playsLast6Months, b.playsLast6Months),
    align: "right",
  },
  {
    display: "Wks since played",
    id: "Wks since played",
    sort: (dir) => (a, b) =>
      (dir || 1) * sortByNumbers(a.wksSincePlayed, b.wksSincePlayed),
    align: "right",
  },
  {
    display: "Key",
    id: "Key",
    sort: (dir) => (a, b) => (dir || 1) * sortByStrings(a.key, b.key),
    align: "right",
  },
];

const SongsPage: React.FC<SongPageProps> = ({
  tab = 0,
  archived = false,
  sortBy,
  sortDirection,
  sortFn,
  setState,
}) => {
  const [songs, error, loading] = useSongs({ archived });
  const [songHistory, songHistoryError, songHistoryLoading] = useSongHistory();

  const rows = useMemo<SongWithMetrics[]>(() => {
    if (Object.keys(songHistory).length < 0 || songs.length < 1) return [];

    const isCatA = tab === 0 || tab === 2;

    const filteredSongs = songs
      .filter((song) => song.tags?.includes(isCatA ? Category.A : Category.B))
      .map((song) => {
        const songWithMetrics: SongWithMetrics = song;
        const services = songHistory[song.id || ""] || [];
        const today = moment();
        if (services[0]) {
          const lastService = moment(services[0]);
          songWithMetrics.wksSincePlayed = today.diff(lastService, "week");

          const sixMonthsAgo = today.subtract(6, "months");
          const includedServices = (songHistory[song.id || ""] || []).filter(
            (s) => moment(s).isAfter(sixMonthsAgo)
          );
          songWithMetrics.playsLast6Months = includedServices.length;
        }
        return songWithMetrics;
      });

    return !sortFn ? filteredSongs : filteredSongs.sort(sortFn(sortDirection));
  }, [songs, songHistory, tab, sortFn, sortDirection]);

  const navigate = useNavigate();
  const handleTabChange = (i) => setState({ tab: i, archived: i >= 2 });

  const handleSortChange = (cell: SongTableHeaderCell) => () => {
    setState({
      sortBy: cell.id,
      sortDirection: sortDirection === 1 && sortBy === cell.id ? -1 : 1,
      sortFn: cell.sort,
    });
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
                      sortBy !== cell.id
                        ? undefined
                        : sortDirection === 1
                        ? "asc"
                        : "desc"
                    }
                  >
                    <TableSortLabel
                      active={sortBy === cell.id}
                      direction={
                        sortBy !== cell.id
                          ? undefined
                          : sortDirection === 1
                          ? "asc"
                          : "desc"
                      }
                      onClick={handleSortChange(cell)}
                    >
                      {cell.display}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((song) => (
                <TableRow
                  key={song.id}
                  onClick={() => navigate(ROUTES.songDetail(song.id))}
                >
                  <TableCell component="th" scope="song">
                    {song.title}
                  </TableCell>
                  <TableCell align="right">{song.author ?? "-"}</TableCell>
                  <TableCell align="right">
                    {song.playsLast6Months ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {song.wksSincePlayed ?? "-"}
                  </TableCell>
                  <TableCell align="right">{song.key ?? "-"}</TableCell>
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
