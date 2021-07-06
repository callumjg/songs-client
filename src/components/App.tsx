import Router from "./Router";
import SongsProvider from "./SongsProvider";

const App = () => (
  <SongsProvider>
    <Router />
  </SongsProvider>
);

export default App;
