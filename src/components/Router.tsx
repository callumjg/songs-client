import { BrowserRouter, Route } from "react-router-dom";
import SongsPage from "../pages/SongsPage";

const Router = () => (
  <BrowserRouter>
    <Route path="/">
      <SongsPage />
    </Route>
  </BrowserRouter>
);

export default Router;
