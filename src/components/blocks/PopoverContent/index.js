import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native/';

const StyledPopoverContent = styled(View)`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
  border-radius: ${(props) => props.theme.main.borderRadius};
`;
const StyledPopoverContentItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  color: white;
`;
const StyledPopoverContentItemWithoutFeedBack = styled.View`
  flex-direction: row;
  padding: 15px;
  color: white;
`;
const PopoverContent = ({items}) => {
  return (
    <StyledPopoverContent>
      {items.map((item) =>
        typeof item.onClick === 'function' ? (
          <StyledPopoverContentItem onPress={item.onClick} key={item.id}>
            {item.element}
          </StyledPopoverContentItem>
        ) : (
          <StyledPopoverContentItemWithoutFeedBack key={item.id}>
            {item.element}
          </StyledPopoverContentItemWithoutFeedBack>
        ),
      )}
    </StyledPopoverContent>
  );
};

PopoverContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      element: PropTypes.element.isRequired,
      onClick: PropTypes.func,
    }),
  ),
};

PopoverContent.defaultProps = {
  items: [],
};

export default PopoverContent;
