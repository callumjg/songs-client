import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Song } from "../apis/songs-api";
import { SongsContext } from "../components/SongsProvider";

interface IUseSongOptions {
  refreshOnLoad?: boolean;
}

const defaultOptions: IUseSongOptions = {
  refreshOnLoad: true,
};

const useSong = (
  id: string,
  opt?: IUseSongOptions
): [Song | undefined, string | undefined, boolean] => {
  const options: IUseSongOptions = { ...defaultOptions, ...opt };
  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const { getById, getByIdCache } = useContext(SongsContext);

  useEffect(() => {
    (async () => {
      setError(undefined);
      const stale = getByIdCache.get(id);
      if (stale) {
        setSong(stale);
        setLoading(false);
      }
      if (stale && !options.refreshOnLoad) return;
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
