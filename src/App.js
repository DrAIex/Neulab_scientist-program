import "./App.css";
import { inputFiles } from "./Seq";
import logoDrNeuLabWhite from "./logoDrNeuLabWhite.png"

const App = () => (
  <div className="App">
    <img className="image" src={logoDrNeuLabWhite} alt="logo" />
    <header className="App-header">
      <input
        type="file"
        id="ctrl"
        // multiple
        className="App-input"
        onChange={() => inputFiles()}
        autoFocus
      />
    </header>
  </div>
);

export default App;
