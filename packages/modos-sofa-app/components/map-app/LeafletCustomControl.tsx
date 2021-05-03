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

  useEffect(() => {
    const cstmCtrl = new Control({ position: props.position });
    cstmCtrl.onAdd = function onAdd() {
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
