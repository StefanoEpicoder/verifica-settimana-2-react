import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';

function App() {
  const [cityName, setCityName] = useState('');

  return (
    <div className="App">
      <Header updateSearch={setCityName}/>
      <Home showCity={cityName}/>
    </div>
  );
}

export default App;
