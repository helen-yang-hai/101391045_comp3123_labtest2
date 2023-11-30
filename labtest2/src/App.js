import logo from './logo.svg';
import './App.css';
import Weather from './component/Weather'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>WEATHER FORECASTING</h1>
      <Weather/>
    </div>
  );
}

export default App;
