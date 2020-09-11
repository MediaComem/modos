import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLeaflet } from 'react-leaflet';
import { Control, DomUtil } from 'leaflet';

interface IProps {
  id: string;
  className?: string;
  position: 'topleft' | 'topright' | 'bottomright' | 'bottomleft';
  children: any;
}


export const LeafletCustomControl = (props: IProps) => {

  const leafletCtxt = useLeaflet();
  let div: HTMLElement | null;

  // leafletCtxt.map.addControl()
  useEffect(() => {
    const cstmCtrl = new Control({ position: props.position });
    cstmCtrl.onAdd = function onAdd(map) {
      div = DomUtil.create('div', `${props.className}`);
      div.id = props.id;
      ReactDOM.render(props.children, div);
      return div;
    };

    leafletCtxt.map.addControl(cstmCtrl);
  }, []);

  useEffect(() => {
    div = document.getElementById(props.id);
    ReactDOM.render(props.children, div);
  }, [ props.children ]);

  return <></>;
};

/*

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

*/
