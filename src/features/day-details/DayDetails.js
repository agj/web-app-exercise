
import React from 'react';
import styles from './DayDetails.module.css';
import { letterFrequency } from '@vx/mock-data';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';


const data = letterFrequency;

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

const x = (d) => d.letter;
const y = (d) => +d.frequency * 100;

console.log(data);

const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

const bars =
  data.map((d, i) => {
    const barHeight = yMax - yPoint(d);
    return (
      <Group key={ `bar-${ i }` }>
        <Bar
          x={ xPoint(d) }
          y={ yMax - barHeight }
          height={ barHeight }
          width={ xScale.bandwidth() }
          fill="red"
        />
      </Group>
    )
  });

export function DayDetails(props) {
  return (
    <div className={ styles.DayDetails }>
      <svg width={ width } height={ height }>
        <Group top={ margin.top } left={ margin.left }>
          { bars }
        </Group>
      </svg>
    </div>
  );
}
