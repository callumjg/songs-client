import Router from "./Router";
import SongsProvider from "./SongsProvider";

import "./App.scss";

const App = () => (
  <SongsProvider>
    <Router />
  </SongsProvider>
);

export default App;
