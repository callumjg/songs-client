import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesPage from "../pages/ServicesPage";
import SongDetailPage from "../pages/SongDetailPage";
import SongsPage, { SongPageProps } from "../pages/SongsPage";
import Layout, { ROUTES } from "./Layout";

const Router = () => {
  const [songPageSettings, setSongPageSettings] = useState({} as SongPageProps);
  const setSongsState = (props: Partial<SongPageProps>): void =>
    setSongPageSettings({ ...songPageSettings, ...props });
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route path={ROUTES.songDetail()} element={<SongDetailPage />} />
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
