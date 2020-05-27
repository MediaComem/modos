import React from 'react';
import { Dropdown } from 'react-bootstrap';

const STYLE_DROPDOWN: React.CSSProperties = {
  position: 'relative',
  fontFamily: 'Gotham Pro Bold',
  width: '110px'
};

const STYLE_DROPDOWN_BTN: React.CSSProperties = {
  height: '$INTERACTIVE_BTN_STD_SIZE',
  border: 'none',
  color: 'var(--secondary-color)',
  background: 'none'
};

const STYLE_DROPDOWN_ITEM: React.CSSProperties = {
  color: 'var(--secondary-color)',
  background: 'none'
};

export const LanguageSelect = props =>
  <div className={props.className}>
    <Dropdown style={STYLE_DROPDOWN}>
      <Dropdown.Toggle
        id='language-dropdown'
        style={STYLE_DROPDOWN_BTN}>
        {(() => {
          switch (props.selectedLanguage) {
            case 'fr':
              return 'FR';

            case 'en':
              return 'EN';

            default:
              return 'none';
          }
        })()}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className='language-dropdown-item'
          onClick={() => {
            props.onLanguageChange('fr');
          }}
          style={STYLE_DROPDOWN_ITEM}
        >
            Français
        </Dropdown.Item>
        <Dropdown.Item
          className='language-dropdown-item'
          onClick={() => {
            props.onLanguageChange('en');
          }}
          style={STYLE_DROPDOWN_ITEM}
        >
            English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
  ;
