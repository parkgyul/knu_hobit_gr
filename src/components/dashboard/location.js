/* global kakao */
// eslint-disable-next-line
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import React, { useEffect } from "react";
import full from "../../assets/images/logos/marker.png";

const Location = () => {
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(34.874414, 128.70144),
      level: 4,
    };

    var map = new kakao.maps.Map(container, options);
    var markerPositions = [
      new kakao.maps.LatLng(34.872408, 128.701388),
      new kakao.maps.LatLng(34.875, 128.705),
      // 추가적인 마커 좌표들을 여기에 추가
    ];

    var imageSrc = full,
      imageSize = new kakao.maps.Size(40, 40)
     
    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
      );


    markerPositions.forEach(position => {
      var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });
      marker.setMap(map);
    });
  }, []);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100&", height: "400px" }}></div>
    </div>
  );
};

export default Location;
