import React from 'react';
import PropTypes from 'prop-types';
import {Column, PrimaryText, Row} from 'components/styled';
import {Image, Text} from 'react-native';

function DropdownItemWithIcon({icon, isLocalSvgIcon, text}) {
  return (
    <Column>
      <Row>
        {isLocalSvgIcon ? (
          icon
        ) : (
          <Image
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              marginRight: 10,
            }}
            source={{uri: icon}}
          />
        )}

        <PrimaryText numberOfLines={1} style={{flex: 1}}>
          {text}
        </PrimaryText>
      </Row>
    </Column>
  );
}

DropdownItemWithIcon.propTypes = {
  currency: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isLocalSvgIcon: PropTypes.bool,
};

DropdownItemWithIcon.defaultProps = {
  isLocalIcon: false,
};
export default DropdownItemWithIcon;
