import React from 'react';
import { TileLayer } from 'react-leaflet';

const URL =
  'https://cartocdn-gusc-c.global.ssl.fastly.net/verdonarthur/api/v1/map/11715edd6df580a3e8f0b69b175012b4:1605615941765/1/{z}/{x}/{y}.png?api_key=default_public';
const ModosFootpathLayer = () => (
  <TileLayer minZoom={14} maxZoom={18} url={URL} />
);

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
