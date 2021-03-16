import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Slider from 'rn-range-slider';

import {RowSpaceBetween, SecondaryText} from 'components/styled';
import BasicField from 'components/fields/BasicField';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';

const areEqual = (prevProps, nextProps) =>
  prevProps.label === nextProps.label &&
  prevProps.min === nextProps.min &&
  prevProps.max === nextProps.max &&
  prevProps.low === nextProps.low &&
  prevProps.high === nextProps.high &&
  prevProps.isDisabled === nextProps.isDisabled;

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
    const [low, setLow] = useState(min);
    const [high, setHigh] = useState(max);
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback((value) => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((l, h) => {
      setLow(l);
      setHigh(h);
      // setOuterLow(l);
      // setOuterHigh(h);
    }, []);

    useEffect(() => {
      if (low !== outerLow) {
        setLow(outerLow);
      }
    }, [outerLow]);
    useEffect(() => {
      if (high !== outerHigh) {
        setHigh(outerHigh);
      }
    }, [outerHigh]);

    const onChangeLowField = (v) => {
      if (v <= high) {
        if (outerLow !== v) {
          setOuterLow(v);
        }
        if (low !== v) {
          setLow(v);
        }
      } else {
        setLow(high);
        setOuterLow(high);
      }
    };

    const onChangeHighField = (v) => {
      if (v >= low) {
        if (outerHigh !== v) {
          setOuterHigh(v);
        }
        if (high !== v) {
          setHigh(v);
        }
      } else {
        setOuterHigh(low);
        setHigh(low);
      }
    };

    return (
      <View>
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
            fieldStyle={{
              width: inputFieldWidth,
              height: 30,
            }}
            input={{value: low.toString(), onChange: onChangeLowField}}
          />
          <BasicField
            fieldStyle={{
              textAlign: 'right',
              width: inputFieldWidth,
              alignSelf: 'flex-end',
              height: 30,
            }}
            input={{value: high.toString(), onChange: onChangeHighField}}
          />
        </RowSpaceBetween>
      </View>
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
