import React, { FunctionComponent } from 'react';

interface PropsGrid {
  isInline?: boolean;
  gap?: string;
  columns?: number;
  rows?: number;
  className?:string;
}

interface PropsCell {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  className?:string;
}

const frGetter = value =>
  typeof value === 'number' ? `repeat(${value}, 1fr)` : value;

const Grid: FunctionComponent<PropsGrid> = props => {
  let { rows, columns, gap, isInline, className } = props;
  return (
    <>
      <style jsx>
        {`
          div {
            display: ${isInline ? 'inline-grid' : 'grid'};
            grid-gap: ${gap ? gap : '8px 8px'};
            ${rows && `grid-template-rows: ${frGetter(rows)}`};
            grid-template-columns: ${!columns
              ? frGetter(12)
              : frGetter(columns)};
          }
        `}
      </style>

      <div className={className}>{props.children}</div>
    </>
  );
};

const Cell: FunctionComponent<PropsCell> = props => {
  let { width, height, left, top, className } = props;
  return (
    <>
      <style jsx>
        {`
          div {
            height: 100%;
            min-width: 0;
            grid-column-end: ${!width ? 'span 1' : `span ${width}`};
            grid-row-end: ${!height ? 'span 1' : `span ${height}`};
            ${left && `grid-column-start: ${left}`};
            ${top && `grid-row-start: ${top}`};
          }
        `}
      </style>

      <div className={className}>{props.children}</div>
    </>
  );
};

export { Grid, Cell };
