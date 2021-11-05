import { createContext } from "react";
import api from "../apis/api";
import Cache from "../utils/Cache";

export interface ISong {
  id?: number;
  title: string;
  url?: string;
  key?: string;
  tempo?: string;
  author?: string;
  songSelectId?: string;
  isArchived?: boolean;
  tags?: string[];
}

export interface IGetSongsParams {
  deleted?: boolean;
  archived?: boolean;
}
export interface ICacheKey {}

interface IValue {
  fetch: (params: IGetSongsParams) => Promise<ISong[]>;
  hashParams: (params: IGetSongsParams) => string;
  unHashParams: (hash: string) => IGetSongsParams;
  cache: Cache<ISong[]>;
}

export const SongsContext = createContext({} as IValue);

const cache = new Cache<ISong[]>();

const SONGS_URL = "/songs";

const fetch = async (params?: IGetSongsParams) => {
  const response = await api.get(SONGS_URL, {
    params,
  });

  return response?.data?.songs;
};

const DELIMINATOR = "&&&&&&&";

const hashParams = (params?: IGetSongsParams): string => {
  return params
    ? Object.keys(params)
        .sort()
        .map((k) => [k, params[k]])
        .join(DELIMINATOR)
    : "";
};

const unHashParams = (hash: string): IGetSongsParams => {
  return hash.split(DELIMINATOR).reduce((map, item) => {
    const [key, value] = item.split("=");
    map[key] = value;
    return map;
  }, {} as IGetSongsParams);
};

const SongsProvider: React.FC = ({ children }) => {
  const value: IValue = {
    fetch,
    cache,
    hashParams,
    unHashParams,
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
};

export default SongsProvider;
