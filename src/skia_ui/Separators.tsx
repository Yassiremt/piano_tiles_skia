import {useWindowDimensions} from 'react-native';
import React from 'react';
import {Line, vec} from '@shopify/react-native-skia';

type Props = {};

const Separators = (props: Props) => {
  const {width, height} = useWindowDimensions();
  const oneOfFourWidth = width / 4;
  const firstLine = {
    p1: vec(oneOfFourWidth, 0),
    p2: vec(oneOfFourWidth, height),
  };
  const secondLine = {
    p1: vec(oneOfFourWidth * 2, 0),
    p2: vec(oneOfFourWidth * 2, height),
  };
  const thirdLine = {
    p1: vec(oneOfFourWidth * 3, 0),
    p2: vec(oneOfFourWidth * 3, height),
  };
  const strokeWidth = 0.5;
  return (
    <>
      <Line
        p1={firstLine.p1}
        p2={firstLine.p2}
        color="white"
        style="stroke"
        strokeWidth={strokeWidth}
      />
      <Line
        p1={secondLine.p1}
        p2={secondLine.p2}
        color="white"
        style="stroke"
        strokeWidth={strokeWidth}
      />
      <Line
        p1={thirdLine.p1}
        p2={thirdLine.p2}
        color="white"
        style="stroke"
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export {Separators};
