import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { AppContext } from './App';

const MapPos = () => {
  const mapPosContext = React.useContext(AppContext);
  return (
    <div>
          <YMaps>
              <div>
              <Map   width='100%'
  height='50vh' defaultState={{ center: [mapPosContext.lat, mapPosContext.long], zoom: 15 }}/*  modules={["control.ZoomControl", "control.FullscreenControl"]} */>
                <Placemark 
                  modules={["geoObject.addon.balloon"]}
                  defaultGeometry={[mapPosContext.lat, mapPosContext.long]}
                  properties={{
                    balloonContentBody:
                      mapPosContext.location
                  }}/>
              </Map>
              </div>
          </YMaps>
    </div>
  )
}

export default MapPos