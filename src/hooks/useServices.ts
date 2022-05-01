import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Service } from "../apis/songs-api";
import { ServicesContext } from "../components/ServicesProvider";

const SERVICES_CACHE_KEY = "SERVICES_CACHE_KEY";

const useServices = (): [Service[], string | null, boolean] => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { list, listServicesCache } = useContext(ServicesContext);

  useEffect(() => {
    (async () => {
      setError(null);
      const stale = listServicesCache.get(SERVICES_CACHE_KEY);
      if (stale) {
        setServices(stale);
        return;
      }
      setLoading(true);

      try {
        const fetchedServices = await list();
        listServicesCache.set(SERVICES_CACHE_KEY, fetchedServices);
        setServices(fetchedServices);
        setLoading(false);
      } catch (err) {
        axios.isAxiosError(err)
          ? setError(err?.message)
          : setError("Unable to list services");

        setLoading(false);
      }
    })();
  }, [listServicesCache, list]);

  return [services, error, loading];
};

export default useServices;
