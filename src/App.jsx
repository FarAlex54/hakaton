/* Широта: 55.0095388, Долгота: 82.4246794, Точность: 20 м */
/* Широта: 54.9832693, Долгота: 82.8963831, Точность: 12053.58603605653 м */
/*   "homepage": "https://github.com/FarAlex54/hakaton.git", */
import { useEffect, useState } from "react";
import "./App.css";

const APIkey = "301284d6b96c42f8825c6077114ba012";

function App() {
  const [location, setLocation] = useState();
  const [lat,setLat] = useState();
  const [long,setLong] = useState();
  const [accuracy,setAccuracy] = useState();

  function getLocationInfo(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setLocation(data.results[0].formatted);
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  }
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Ваше местоположение:");
    console.log(`Широта : ${crd.latitude}`);
    console.log(`Долгота: ${crd.longitude}`);
    console.log(`Точность ${crd.accuracy} метров.`);
    setLat(crd.latitude);
    setLong(crd.longitude);
    setAccuracy(crd.accuracy);
    getLocationInfo(crd.latitude, crd.longitude);
  }

  function errors(err) {
    console.warn(`Ошибка определения положения: (${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {navigator.geolocation.getCurrentPosition(success, errors, options);}
          else if (result.state === "prompt") {navigator.geolocation.getCurrentPosition(success, errors, options);}
          else if (result.state === "denied") {}
        });
    } else {console.log("Доступ к геоданным закрыт браузером");}
  }, []);

  return (
    <div className="App">
      {location ? <>Your location: {location}</> : null}
      <p>Широта: {lat}</p>
      <p>Долгота: {long}</p>
      <p>Точность: {accuracy}</p>
    </div>
  );
}

export default App;