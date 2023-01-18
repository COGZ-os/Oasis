import React, { useEffect, useRef, useState } from "react";

const MapComponent = (props) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: props.center,
        zoom: props.zoom,
      }));
    }
  }, [props.center, ref, map]);

  return <div ref={ref} id="map" />
}

export default MapComponent;