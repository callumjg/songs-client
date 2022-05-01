import { createContext } from "react";
import api from "../apis/api";
import { Service } from "../apis/songs-api";

import Cache from "../utils/Cache";

const SERVICES_URL = "/services";

interface IServiceProviderValue {
  list: () => Promise<Service[]>;
  listServicesCache: Cache<Service[]>;
}

export const ServicesContext = createContext({} as IServiceProviderValue);

const listServicesCache = new Cache<Service[]>();

const list = async (): Promise<Service[]> => {
  const response = await api.get(SERVICES_URL);

  const services = response?.data?.services || [];

  return services;
};

const ServicesProvider = ({ children }) => {
  const value: IServiceProviderValue = {
    list,
    listServicesCache,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
