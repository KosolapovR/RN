import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';
import BasicField from '../BasicField';
import {RowSpaceBetween, SecondaryText} from '../../styled';

const Container = styled.View``;

function areEqual(prevProps, nextProps) {
  let equal =
    prevProps.label === nextProps.label &&
    prevProps.min === nextProps.min &&
    prevProps.max === nextProps.max &&
    prevProps.low === nextProps.low &&
    prevProps.high === nextProps.high &&
    prevProps.isDisabled === nextProps.isDisabled;
  return equal;
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}

const RangeField = React.memo(
  ({
    label,
    min,
    max,
    low: outerLow,
    high: outerHigh,
    setLow: setOuterLow,
    setHigh: setOuterHigh,
    step,
    isDisabled,
    inputFieldWidth,
  }) => {
    console.log(label, 'was rendered ');
    const [low, setLow] = useState(min);
    const [high, setHigh] = useState(max);
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback((value) => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((l, h) => {
      if (low !== l) {
        setLow(l);
      }
      if (high !== h) {
        setHigh(h);
      }
      if (outerLow !== l) {
        setOuterLow(l);
      }
      if (outerHigh !== h) {
        setOuterHigh(h);
      }
    }, []);

    useEffect(() => {
      if (low !== outerLow) setLow(outerLow);
    }, [outerLow]);
    useEffect(() => {
      if (high !== outerHigh) setHigh(outerHigh);
    }, [outerHigh]);

    const onChangeLowField = (v) => {
      if (outerLow !== v) setOuterLow(v);
      if (low !== v) setLow(v);
    };

    const onChangeHighField = (v) => {
      if (outerHigh !== v) setOuterHigh(v);
      if (high !== v) setHigh(v);
    };

    return (
      <Container>
        <SecondaryText paddingBottom={10}>{label}</SecondaryText>
        <Slider
          disabled={isDisabled}
          min={min}
          max={max}
          step={step}
          low={low}
          high={high}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
        <RowSpaceBetween>
          <BasicField
            containerStyle={{
              width: inputFieldWidth,
              paddingTop: 10,
            }}
            fieldStyle={{height: 25}}
            input={{value: low.toString(), onChange: onChangeLowField}}
          />
          <BasicField
            containerStyle={{width: inputFieldWidth, paddingTop: 10}}
            fieldStyle={{textAlign: 'right', height: 25}}
            input={{value: high.toString(), onChange: onChangeHighField}}
          />
        </RowSpaceBetween>
      </Container>
    );
  },
  areEqual,
);

RangeField.propTypes = {
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  inputFieldWidth: PropTypes.number,
  low: PropTypes.number,
  high: PropTypes.number,
  setLow: PropTypes.func,
  setHigh: PropTypes.func,
};

RangeField.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  label: null,
  isDisabled: false,
  inputFieldWidth: 80,
  low: 0,
  high: 100,
  setLow: () => {},
  setHigh: () => {},
};

export default RangeField;
