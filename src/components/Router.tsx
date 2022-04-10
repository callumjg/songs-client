import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesPage from "../pages/ServicesPage";
import SongsPage, { ISongPageProps } from "../pages/SongsPage";
import Layout, { ROUTES } from "./Layout";

const Router = () => {
  const [songPageSettings, setSongPageSettings] = useState(
    {} as ISongPageProps
  );
  const setSongsState = (props: Partial<ISongPageProps>): void =>
    setSongPageSettings({ ...songPageSettings, ...props });
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route
            path={ROUTES.songs}
            element={
              <SongsPage {...songPageSettings} setState={setSongsState} />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
