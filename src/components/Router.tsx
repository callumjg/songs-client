import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route path={ROUTES.services}>
            <ServicesPage />
          </Route>
          <Route path={ROUTES.songs}>
            <SongsPage {...songPageSettings} setState={setSongsState} />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
