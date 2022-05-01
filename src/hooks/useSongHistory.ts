import moment from "moment";
import React from "react";
import useServices from "./useServices";

interface ISongMetrics {
  services: string[];
  weeksSincePlayed?: number;
}

interface ISongHistoryMap {
  [songId: string]: string[];
}

const useSongHistory = (): [ISongHistoryMap, string | null, boolean] => {
  const [services, error, loading] = useServices();
  const songHistory = services.reduce((acc, service) => {
    service.songs?.forEach((songId) => {
      acc[songId] = [...(acc[songId] || []), service.date].sort((a, b) =>
        moment(a).isBefore(moment(b)) ? 1 : -1
      );
    });
    return acc;
  }, {});

  return [songHistory, error, loading];
};

export default useSongHistory;
