/* global kakao */
// eslint-disable-next-line
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import React, { useEffect } from 'react'

const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(34.874414, 128.701440),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(34.872408, 128.701388); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    }, [])


    return (
        <div style={{ border: '5px solid #E6EAFE' }}>
        <div id="map" style={{width:"100&", height:"400px"}}></div>
       
        </div>
    )
}

export default Location;