import React from 'react'
import { useEffect } from "react";
import "./App.css";
import { AppContext } from './App';

const APIkey = "301284d6b96c42f8825c6077114ba012";

const FindPos = () => {
  const findPosContext = React.useContext(AppContext);
  function getLocationInfo(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          findPosContext.setLocation(data.results[0].formatted);
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
    findPosContext.setLat(crd.latitude);
    findPosContext.setLong(crd.longitude);
    findPosContext.setAccuracy(crd.accuracy);
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
    <div>
      {findPosContext.location ? <>Your location: {findPosContext.location}</> : null}
      <p>Широта: {findPosContext.lat}</p>
      <p>Долгота: {findPosContext.long}</p>
      <p>Точность: {findPosContext.accuracy}</p>
    </div>
  )
}

export default FindPos