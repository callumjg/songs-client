import Router from "./Router";
import SongsProvider from "./SongsProvider";

import "./App.scss";
import ServicesProvider from "./ServicesProvider";

const App = () => (
  <ServicesProvider>
    <SongsProvider>
      <Router />
    </SongsProvider>
  </ServicesProvider>
);

export default App;
