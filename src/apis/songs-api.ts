/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  email: string;
}

/**
 * A song
 */
export interface Song {
  /** @format uuid */
  id?: string;
  title: string;
  url?: string;
  key?: string;
  tempo?: string;
  author?: string;
  songSelectId?: string;
  archived?: boolean;
  tags?: string[];
}

/**
 * A service of songs
 */
export interface Service {
  /** @format date-time */
  date: string;
  songs?: string[];
  notes?: string[];
}

export namespace Songs {
  /**
   * @description Gets a list of songs
   * @name ListSongs
   * @request GET:/songs
   * @response `200` `{ songs: (Song)[] }`
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace ListSongs {
    export type RequestParams = {};
    export type RequestQuery = { archived?: boolean; deleted?: boolean };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { songs: Song[] };
  }
  /**
   * @description Create a song
   * @name CreateSong
   * @request POST:/songs
   * @response `201` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace CreateSong {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Song;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Get a song by id
   * @name GetSongById
   * @request GET:/songs/{id}
   * @response `200` `void` OK
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace GetSongById {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Update a song
   * @name UpdateSongById
   * @request PATCH:/songs/{id}
   * @response `204` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace UpdateSongById {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = Song;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Delete a song
   * @name DeleteSongById
   * @request DELETE:/songs/{id}
   * @response `204` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace DeleteSongById {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Services {
  /**
   * @description Gets a list of services
   * @name ListServices
   * @request GET:/services
   * @response `200` `{ services: (Service)[] }`
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace ListServices {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { services: Service[] };
  }
  /**
   * @description Sync services with google sheets
   * @name SyncServices
   * @request POST:/services/sync
   * @response `204` `void` OK
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SyncServices {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
