import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useEffect } from "react";
import { useState } from 'react';


/* Широта: 55.0095388, Долгота: 82.4246794, Точность: 20 м */
/* Широта: 54.9832693, Долгота: 82.8963831, Точность: 12053.58603605653 м */

function App() {
  const [lat, setLat] = useState();
  const [long,setLong] = useState();
  const [accuracy,setAccuracy] = useState();
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function errors() {
    console.log('Произошла ошибка');
  }

  useEffect(() => {
    function locateUser() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
                  if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition((pos)=>{setLat(pos.coords.latitude);
                                                                     setLong(pos.coords.longitude);
                                                                     setAccuracy(pos.coords.accuracy);}, errors, options);
                  }
                });}}
/*     if (accuracy>100) {console.log('1'); */
    locateUser();
  },[]);
 
  return (
    <div className="App">
      <Form>
        <div className="d-flex ">
          <div className='d-flex justify-content-center p-2 col-9 '>
            <YMaps>
              <div>
                <Map defaultState={{ center: [lat, long], zoom: 15 }}>
                  <Placemark 
                  modules={["geoObject.addon.balloon"]}
                  defaultGeometry={[lat, long]}
                  properties={{
                    balloonContentBody:
                      "Широта: " + lat + ", Долгота: " + long + ", Точность: " + accuracy + " м",
                  }}/>
                </Map>
              </div>
            </YMaps>
          </div>
          <div className='p-2 col-3'>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="БанкУслуга 1" />
                <Form.Check type="checkbox" label="БанкУслуга 2" />
                <Form.Check type="checkbox" label="БанкУслуга 3" />
                <Form.Check type="checkbox" label="БанкУслуга 4" />
                <Form.Check type="checkbox" label="БанкУслуга 5" />
                <Form.Check type="checkbox" label="БанкУслуга 6" />
                <Form.Check type="checkbox" label="БанкУслуга 7" />
                <Form.Check type="checkbox" label="БанкУслуга 8" />
              </Form.Group>
              <Button variant="success">Поиск</Button>{' '}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;
