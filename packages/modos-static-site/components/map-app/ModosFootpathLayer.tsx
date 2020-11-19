import React, { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import carto from '@carto/carto.js';

const ModosFootpathLayer = () => {
  const LeafletContext = useLeaflet();
  useEffect(() => {
    const cartoClient = new carto.Client({
      apiKey: 'default_public',
      username: 'verdonarthur'
    });
    const modosWalknetSource = new carto.source.SQL(
      'SELECT * FROM modos_walknet'
    );
    const modosWalknetStyle = new carto.style.CartoCSS(`
      #layer {
        line-color: #4CC8A3;
        line-width: 1.5;
        line-opacity: 1;
      }
    `);

    const modosWalknetLayer = new carto.layer.Layer(
      modosWalknetSource,
      modosWalknetStyle
    );

    cartoClient.addLayer(modosWalknetLayer);
    cartoClient.getLeafletLayer().addTo(LeafletContext.layerContainer);
  }, []);
  return <div />;
};

// Bellow is the code begining of the integration of VectorGrid raster from
// a geojson. TODO: Check with OEZ for perf
// const ModosFootpathLayer = () => {
//   const LeafletContext = useLeaflet();

//   useEffect(() => {

//     customFetch(URL_GEOJSON)
//       .then((data: any) => {
//         const MyVGrid = (L as any).vectorGrid.slicer(data, {
//           maxZoom: 18,
//           tolerance: 20
//         });

//         LeafletContext.map.addLayer(MyVGrid);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return <div></div>;
// };

export default ModosFootpathLayer;
