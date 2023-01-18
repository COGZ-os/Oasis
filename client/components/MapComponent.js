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

  return (
    <>
      <div ref={ref} id="map" />
      {React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        // @ts-ignore
        return React.cloneElement(child, { map });
      }
    })}
    </>
  ) 
}

export default MapComponent;