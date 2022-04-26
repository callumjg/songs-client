import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import useSong from "../hooks/useSong";

const SongDetailPage: React.FC = () => {
  const { id } = useParams();

  const [song, error, loading] = useSong(Number(id));

  const songSelectUrl: string | undefined =
    song?.songSelectId &&
    `https://songselect.ccli.com/Songs/${song.songSelectId}`;
  return (
    <PageSpinner loading={loading}>
      <div style={{ margin: "3rem 0" }}>
        <h2>{song?.title}</h2>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>{song?.author}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>{song?.key}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>{song?.tags?.join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Song Select</TableCell>
                <TableCell>
                  {song?.songSelectId ? (
                    <a
                      href={songSelectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {songSelectUrl}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageSpinner>
  );
};

export default SongDetailPage;
