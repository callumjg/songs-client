import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Song } from "../apis/songs-api";
import { IListSongsParams, SongsContext } from "../components/SongsProvider";

const useSong = (
  id: number
): [Song | undefined, string | undefined, boolean] => {
  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { getById, getByIdCache } = useContext(SongsContext);

  useEffect(() => {
    (async () => {
      setError(undefined);
      const stale = getByIdCache.get(String(id));
      if (stale) setSong(stale);
      setLoading(true);
      try {
        const fetchedSong = await getById(id);
        getByIdCache.set(String(id), fetchedSong);
        setSong(fetchedSong);
        setLoading(false);
      } catch (err) {
        axios.isAxiosError(err)
          ? setError(err?.message)
          : setError("Unable to fetch song");

        setLoading(false);
      }
    })();
  }, [getById, getByIdCache, id]);

  return [song, error, loading];
};

export default useSong;
