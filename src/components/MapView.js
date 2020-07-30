import React, { Component } from 'react';
import { Map, TileLayer , Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';

function MapView(props)  {
  // console.log(props.mapcenter.updated)
      let cnt = props.mapcenter.updated === undefined?[{lat: 20.593 , lng: 78.962},3]:[{ lat: props.mapcenter.countryInfo.lat , lng: props.mapcenter.countryInfo.long},5] 
      const state = {
        currentLocation: cnt[0],
        zoom: cnt[1]
      }
      // console.log('THIS IS CNT',cnt)
     
    const { currentLocation, zoom } = state;

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
        />
        <Markers venues={props.countries_data} casestatus={props.casestatus} />
      </Map>
    );
  
}

export default MapView;