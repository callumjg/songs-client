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

export interface Song {
  id?: number;
  title: string;
  url?: string;
  key?: string;
  tempo?: string;
  author?: string;
  songSelectId?: string;
  archived?: boolean;
  tags?: string[];
}

export namespace Users {
  /**
   * @description Create a user
   * @name UsersCreate
   * @request POST:/users
   * @response `201` `void` OK
   */
  export namespace UsersCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Gets a user
   * @name UsersDetail
   * @request GET:/users/{id}
   * @response `200` `void` OK
   */
  export namespace UsersDetail {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Songs {
  /**
   * @description Gets a list of songs
   * @name SongsList
   * @request GET:/songs
   * @response `200` `{ songs: (Song)[] }`
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SongsList {
    export type RequestParams = {};
    export type RequestQuery = { archived?: boolean; deleted?: boolean };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { songs: Song[] };
  }
  /**
   * @description Create a song
   * @name SongsCreate
   * @request POST:/songs
   * @response `201` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SongsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Song;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Get a song by id
   * @name SongsDetail
   * @request GET:/songs/{id}
   * @response `200` `void` OK
   * @response `400` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SongsDetail {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Update a song
   * @name SongsUpdate
   * @request PUT:/songs/{id}
   * @response `204` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SongsUpdate {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = Song;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Delete a song
   * @name SongsDelete
   * @request DELETE:/songs/{id}
   * @response `204` `void` OK
   * @response `400` `{ message: string }`
   * @response `404` `{ message: string }`
   * @response `500` `{ message: string }`
   */
  export namespace SongsDelete {
    export type RequestParams = { id: number };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
