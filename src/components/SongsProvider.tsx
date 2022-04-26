import { createContext } from "react";
import api from "../apis/api";
import { Song } from "../apis/songs-api";

import Cache from "../utils/Cache";

export interface IListSongsParams {
  deleted?: boolean;
  archived?: boolean;
}
const SONGS_URL = "/songs";

interface ISongProviderValue {
  list: (params: IListSongsParams) => Promise<Song[]>;
  getById: (id: number) => Promise<Song>;
  listSongsCache: Cache<Song[]>;
  getByIdCache: Cache<Song>;
}

export const SongsContext = createContext({} as ISongProviderValue);

const listSongsCache = new Cache<Song[]>();
const getByIdCache = new Cache<Song>();

const list = async (params: IListSongsParams): Promise<Song[]> => {
  const response = await api.get(SONGS_URL, {
    params,
  });

  return response?.data?.songs.map((s) => ({ id: s.songId, ...s }));
};

const getById = async (id: number): Promise<Song> => {
  const response = await api.get(`${SONGS_URL}/${id}`);
  return response.data;
};

const SongsProvider = ({ children }) => {
  const value: ISongProviderValue = {
    list,
    getById,
    listSongsCache,
    getByIdCache,
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
};

export default SongsProvider;
