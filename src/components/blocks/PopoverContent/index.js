import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native/';
import {Row} from 'components/styled';

const StyledPopoverContent = styled.View`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
  border-radius: ${(props) => props.theme.main.borderRadius};
`;
const StyledPopoverContentItem = styled.TouchableOpacity`
  padding: 15px;
`;
const StyledPopoverContentItemWithoutFeedBack = styled(Row)`
  padding: 15px;
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
