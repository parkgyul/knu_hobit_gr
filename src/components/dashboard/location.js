/* global kakao */
// eslint-disable-next-line
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import React, { useEffect } from "react";
import fullopr from "../../assets/images/logos/fullopr.svg";
import fullstop from "../../assets/images/logos/fullstop.svg";
import empopr from "../../assets/images/logos/empopr.svg";
import empstop from "../../assets/images/logos/empstop.svg";


const Location = () => {
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(34.874414, 128.70144),
      level: 4,
    };

    var map = new kakao.maps.Map(container, options);
    var markerPositions = [
      { position: new kakao.maps.LatLng(34.872408, 128.701388), imageSrc: fullopr },
      { position: new kakao.maps.LatLng(34.873796, 128.699814), imageSrc: fullstop },
      { position: new kakao.maps.LatLng(34.875612, 128.703655), imageSrc: empopr },
      { position: new kakao.maps.LatLng(34.872450, 128.702243), imageSrc: empstop },
      { position: new kakao.maps.LatLng(34.874016, 128.705163), imageSrc: fullopr },
      { position: new kakao.maps.LatLng(34.874235, 128.702701), imageSrc: empstop },
      // 추가적인 마커 좌표들을 여기에 추가하고 각각의 이미지 경로를 설정
    ];

    markerPositions.forEach(({ position, imageSrc }) => {
      var imageSize = new kakao.maps.Size(40, 40);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      
      var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });
      marker.setMap(map);
    });
  }, []);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default Location;
