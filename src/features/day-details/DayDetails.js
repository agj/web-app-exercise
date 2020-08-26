
import React from 'react';
import styles from './DayDetails.module.css';
import { Group } from '@vx/group';
import { LinePath, Circle } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { pipe, min, max } from 'ramda';



const data = [
  { time: 0, temperature: 12 },
  { time: 1, temperature: 9 },
  { time: 2, temperature: 8 },
  { time: 3, temperature: 6 },
  { time: 4, temperature: 2 },
  { time: 5, temperature: 1 },
];

const width = 500;
const height = 500;

const margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const x = (d) => d.time;
const y = (d) => d.temperature;

console.log(data);

const xScale = scaleLinear({
  range: [0, xMax],
  domain: [data.map(x).reduce(min), data.map(x).reduce(max)],
});
const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [data.map(y).reduce(min), data.map(y).reduce(max)],
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

export function DayDetails(props) {
  return (
    <div className={ styles.DayDetails }>
      <svg width={ width } height={ height }>
        <Group top={ margin.top } left={ margin.left }>
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
        </Group>
      </svg>
    </div>
  );
}

