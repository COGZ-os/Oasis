import React, { useEffect, useRef } from "react";

const MapComponent = (props) => {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center: props.center,
      zoom: props.zoom,
    });
  }, []);

  return <div ref={ref} id="map" />;
}

export default MapComponent;