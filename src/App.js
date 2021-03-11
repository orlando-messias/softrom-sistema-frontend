// aws
import Amplify from "aws-amplify";
import amplify_config from "./config/amplify-config";

import Routes from './Routes';
import './App.css';

Amplify.configure(amplify_config);

function App() {
  return (
    <Routes />
  );
}

export default App;
