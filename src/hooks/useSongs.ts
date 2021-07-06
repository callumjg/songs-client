import { useContext, useEffect, useState } from "react";
import {
  IGetSongsParams,
  ISong,
  SongsContext,
} from "../components/SongsProvider";

const useSongs = ({ archived, deleted }: IGetSongsParams = {}): [
  ISong[],
  string | null,
  boolean
] => {
  const [songs, setSongs] = useState([] as ISong[]);
  const [error, setError] = useState(null as string | null);
  const [loading, setLoading] = useState(false);
  const { hashParams, fetch, cache } = useContext(SongsContext);

  useEffect(() => {
    (async () => {
      setError(null);
      const par = { deleted, archived };
      const stale = cache.get(hashParams(par));
      if (stale) setSongs(stale);
      setLoading(true);
      try {
        const fetchedSongs = await fetch({ deleted, archived });
        cache.set(hashParams(par), fetchedSongs);
        setSongs(fetchedSongs);
        setLoading(false);
      } catch (err) {
        setError(err?.message);
        setLoading(false);
      }
    })();
  }, [deleted, archived, cache, fetch, hashParams]);

  return [songs, error, loading];
};

export default useSongs;
