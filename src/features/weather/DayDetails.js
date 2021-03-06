import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Group } from '@vx/group';
import { LinePath, Circle } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { pipe, min, max } from 'ramda';
import { retrieveDayTemperatures, selectDayTemperatures } from './weatherSlice';



const x = (d) => (new Date(d.time)).getHours();
const y = (d) => d.temperature;


export function DayDetails({ width, height, day }) {
  const data = useSelector(selectDayTemperatures(day));

  const dispatch = useDispatch();
  useEffect(() => {
    if (day && (!data || data.length === 0)) {
      dispatch(retrieveDayTemperatures(day));
    }
  });

  if (!data || data.length === 0) {
    return <div></div>;
  }

  const margin = {
    top: 6,
    bottom: 30,
    left: 30,
    right: 0,
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
      data.map(y).reduce(min, 10),
      data.map(y).reduce(max, 25),
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
    <svg
      viewBox={ `0 0 ${ width } ${ height }` }
      className="img-fluid mx-auto"
    >
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
  );
}

