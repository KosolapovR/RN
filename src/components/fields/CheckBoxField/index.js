import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {Row} from 'components/styled';

const Container = styled.TouchableOpacity`
  flex-direction: row;
`;

const CustomCheckBox = styled.View`
  height: 20px;
  width: 20px;
  background: ${(props) =>
    props.checkBoxActive
      ? props.theme.main.backgroundColors.blue
      : 'transparent'};
  border-radius: 3.5px;
  position: relative;
  justify-content: center;
  margin: 0 8px 0 0;
  border-style: solid;
  border-color: ${(props) => props.theme.main.colors.secondary}
  border-width: ${(props) => (!props.checkBoxActive ? '1px' : 0)};
`;
const CheckIcon = styled.View`
  border-radius: 0px;
  align-self: center;
  transform: rotate(-40deg);
`;
const Label = styled.Text`
  flex-wrap: wrap;
  color: ${(props) => props.theme.main.colors.secondary};
`;

/*==============================
    Custom  checkbox styled
===============================*/
const CheckIconWrapper = styled.View`
  position: relative;
  left: 1px;
  top: -1px;
`;
const CheckIconVertical = styled.View`
  height: 4px;
  width: 2px;
  background: ${(props) => (props.checkBoxActive ? '#fff' : 'transparent')};
`;
const CheckIconHorizontal = styled.View`
  height: 2px;
  width: 12px;
  background: ${(props) => (props.checkBoxActive ? '#fff' : 'transparent')};
`;
const CheckBoxField = ({
  label,
  name,
  isDisabled,
  error,
  touched,
  value,
  onChange,
}) => {
  const [checked, setChecked] = useState(value);

  return (
    <Container
      onPress={() => {
        onChange(!checked);
        setChecked(!checked);
      }}>
      <CustomCheckBox checkBoxActive={checked}>
        <CheckIcon>
          <CheckIconWrapper>
            <CheckIconVertical checkBoxActive={checked} />
            <CheckIconHorizontal checkBoxActive={checked} />
          </CheckIconWrapper>
        </CheckIcon>
      </CustomCheckBox>
      {label && (
        <Row style={{flex: 1}}>
          <Label>{label}</Label>
        </Row>
      )}
    </Container>
  );
};

CheckBoxField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
};

CheckBoxField.defaultProps = {
  label: null,
  isDisabled: false,
};

export default CheckBoxField;
