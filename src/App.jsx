/* Широта: 55.0095388, Долгота: 82.4246794, Точность: 20 м */
/* Широта: 54.9832693, Долгота: 82.8963831, Точность: 12053.58603605653 м */
/*   "homepage": "https://github.com/FarAlex54/hakaton.git", */
/* ngrok http http://192.168.2.180:80 --region=ap */
import React from 'react'
import "./App.css";
import FindPos from './FindPos';
import MapPos from './MapPos';
import { useState } from "react";


export const AppContext = React.createContext({})

function App() {
  const [location, setLocation] = useState();
  const [lat,setLat] = useState();
  const [long,setLong] = useState();
  const [accuracy,setAccuracy] = useState();
  return (
    <AppContext.Provider
      value={{location, setLocation,lat,setLat,long,setLong,accuracy,setAccuracy}}>
      <div className="App">
        <FindPos/>
        <MapPos/>
      </div>
    </AppContext.Provider>
  );
}

export default App;