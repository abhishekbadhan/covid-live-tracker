import React, { Fragment } from 'react'
import {Marker, Circle, Popup} from 'react-leaflet';
import './Popup.css'

const VenueMarkers = (props) => {
  const { venues ,casestatus} = props;
  if (casestatus == "active"){
    var circol = "rgb(243, 94, 56)"
  }
  else if (casestatus === "recovered"){
    var circol = "#14d435"
  }
  else{
    var circol = "red"
  }
  // var circol = circol
  const markers = venues.map((venue,index) => (
    <Marker 
    key={index}   
    position={[venue.countryInfo.lat , venue.countryInfo.long ]}
    >
      <Circle 
        center={{lat:venue.countryInfo.lat , lng:venue.countryInfo.long }}
        fillOpacity={0.3}
        fillColor={circol} 
        color = {circol}
        radius={venue[casestatus]}/>
        <Popup  >
          <div className="mainpopup">
          <div className="country_name" >
            {venue.country}
          </div>
          <div>
            <img src={venue.countryInfo.flag} style={{width:109}} ></img>
          </div>
        <div>
          CASES :- {venue.active}
        </div>
        <div>
          RECOVERED :- {venue.recovered}
        </div>
        <div>
          DEATHS :- {venue.deaths}
        </div>
        </div>

      </Popup>
    </Marker>
    ));

  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;