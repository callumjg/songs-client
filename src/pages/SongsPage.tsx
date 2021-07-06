import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import Layout from "../components/Layout";
import useSongs from "../hooks/useSongs";

const SongsPage = () => {
  const [archived, setArchived] = useState(false);
  const [songs, error] = useSongs({ archived });
  return (
    <Layout>
      <button onClick={() => setArchived((v) => !v)}>Toggle archived</button>
      {error && <p>{error}</p>}
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => (
              <TableRow key={song.id}>
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
    </Layout>
  );
};

export default SongsPage;
