import { createContext } from "react";
import api from "../apis/api";
import { Song } from "../apis/songs-api";
// imp
import Cache from "../utils/Cache";

// export interface ISong {
//   id?: number;
//   title: string;
//   url?: string;
//   key?: string;
//   tempo?: string;
//   author?: string;
//   songSelectId?: string;
//   isArchived?: boolean;
//   tags?: string[];
// }

export interface IListSongsParams {
  deleted?: boolean;
  archived?: boolean;
}
const SONGS_URL = "/songs";

interface ISongProviderValue {
  list: (params: IListSongsParams) => Promise<Song[]>;
  cache: Cache<Song[]>;
}

export const SongsContext = createContext({} as ISongProviderValue);

const cache = new Cache<Song[]>();

const list = async (params: IListSongsParams): Promise<Song[]> => {
  const response = await api.get(SONGS_URL, {
    params,
  });

  return response?.data?.songs;
};

const SongsProvider = ({ children }) => {
  const value: ISongProviderValue = {
    list,
    cache,
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
};

export default SongsProvider;
