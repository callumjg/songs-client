import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Song } from "../apis/songs-api";
import { IListSongsParams, SongsContext } from "../components/SongsProvider";

const useSongs = ({ archived, deleted }: IListSongsParams = {}): [
  Song[],
  string | null,
  boolean
] => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { list, listSongsCache } = useContext(SongsContext);

  useEffect(() => {
    (async () => {
      setError(null);
      const par = { deleted, archived };
      const parJson = JSON.stringify(par);
      const stale = listSongsCache.get(parJson);
      if (stale) {
        setSongs(stale);
      } else {
        setLoading(true);
      }
      try {
        const fetchedSongs = await list(par);
        listSongsCache.set(parJson, fetchedSongs);
        setSongs(fetchedSongs);
        setLoading(false);
      } catch (err) {
        axios.isAxiosError(err)
          ? setError(err?.message)
          : setError("Unable to list songs");

        setLoading(false);
      }
    })();
  }, [deleted, archived, listSongsCache, list]);

  return [songs, error, loading];
};

export default useSongs;
