import { useEffect, useState } from 'react';
import { TileLayer, Map } from 'leaflet';

const Leaflet = props => {
  const [isMapInit, setIsMapInit] = useState(false);

  useEffect(() => {
    if (isMapInit) return;

    let leaflet: any = require('leaflet');
    require('leaflet-providers');

    const MAP: Map = leaflet.map(props.id);

    MAP.fitBounds([[45, 6], [48, 11]]);

    const CARTO_DB_POSITRON: TileLayer = leaflet.tileLayer.provider('CartoDB.Positron')

    CARTO_DB_POSITRON.addTo(MAP)

    setIsMapInit(true);
  });

  return (
    <div id={props.id}>
      <style jsx>{`
        div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export { Leaflet };
