
import React from 'react';
import styles from './DayDetails.module.css';
import { Group } from '@vx/group';
import { LinePath, Circle } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { pipe, min, max } from 'ramda';



const data = [
  { time: 0, temperature: 12 },
  { time: 3, temperature: 8 },
  { time: 6, temperature: -2 },
  { time: 9, temperature: 6 },
  { time: 12, temperature: 11 },
  { time: 15, temperature: 17 },
  { time: 18, temperature: 16 },
  { time: 21, temperature: 13 },
];

const x = (d) => d.time;
const y = (d) => d.temperature;


export function DayDetails(props) {
  const width = props.width;
  const height = props.height;
  
  const margin = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };
  
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  
  const xScale = scaleBand({
    range: [0, xMax],
    domain: data.map(x),
    paddingOuter: 0.5,
    paddingInner: 1,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [
      data.map(y).reduce(min),
      data.map(y).reduce(max),
    ],
    nice: true,
  });
  
  const xPoint = pipe(x, xScale);
  const yPoint = pipe(y, yScale);
  
  const dots =
    data.map((d, i) => {
      return (
        <Circle
          key={ `dot-${ x(d) }` }
          cx={ xPoint(d) }
          cy={ yPoint(d) }
          r="10"
          fill="red"
        />
      )
    });

  return (
    <div className={ styles.DayDetails }>
      <svg width={ width } height={ height }>
        <Group top={ margin.top } left={ margin.left }>
          <GridColumns
            scale={ xScale }
            width={ xMax }
            height={ yMax }
            stroke="silver"
          />
          <GridRows
            scale={ yScale }
            width={ xMax }
            height={ yMax }
            stroke="silver"
          />
          <LinePath
            data={ data }
            x={ pipe(x, xScale) }
            y={ pipe(y, yScale) }
            stroke="red"
            strokeWidth={ 1.5 }
            shapeRendering="geometricPrecision"
          />
          <Group>
            { dots }
          </Group>
          <AxisLeft
            scale={ yScale }
            tickFormat={ (v) => `${ v.toString() }°` }
          />
          <AxisBottom
            scale={ xScale }
            top={ yMax }
            tickFormat={ (v) => `${ v.toString() }:00` }
          />
        </Group>
      </svg>
    </div>
  );
}

