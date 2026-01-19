import Header from "./components/header";
import Logs from "./pages/logs";
import Dashboard from "./pages/dashboard";
import { logs } from "./data/logs";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header title="EcoTrack - Carbon Footprint Tracker Experiment 1" />
      <Dashboard />
      <Logs logs={logs} />
      <BrowserRouter>
      
      </BrowserRouter> 
    </div>
  );
};

export default App;
