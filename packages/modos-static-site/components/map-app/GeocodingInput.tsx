import React, { useState, useEffect } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

import { geocode, IMapnvFeature } from '../../libs/mapnv-api';
import style from './map-app.module.scss';

/**
 *
 * @param props
 */
export const GeocodingInput = props => {
  const [ suggestions, setSuggestions ] = useState([]);
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ userInput, setUserInput ] = useState('');

  useEffect(() => {
    geocode(userInput)
      .then(result => setSuggestions(result.features))
      .catch(err => console.error(err));
  }, [ userInput ]);

  const onChange = evt => {
    setUserInput(evt.currentTarget.value);
  };

  const toogleFocus = () => {
    setShowSuggestions(!showSuggestions);
  };

  const onChooseLocation = (suggestion: IMapnvFeature) => {
    setUserInput(suggestion.properties.label);
    setShowSuggestions(false);
    props.onChooseLocation(suggestion);
  };

  return <>
    <FormControl type='text' onChange={onChange} onFocus={toogleFocus} name={props.name} value={userInput}/>

    {showSuggestions && <ListGroup className={style['geocodinginput-suggestions']}>
      {(suggestions.length <= 0 && userInput !== '') && <ListGroup.Item>...</ListGroup.Item>}

      {suggestions.map((suggestion: IMapnvFeature, index) =>
        <AddressSuggestion
          key={index}
          name={suggestion?.properties?.label}
          onClick={() => onChooseLocation(suggestion)}
        />)}
    </ListGroup>}

  </>;
};

const AddressSuggestion = props =>
  <ListGroup.Item action onClick={props.onClick}>{props.name}</ListGroup.Item>;


