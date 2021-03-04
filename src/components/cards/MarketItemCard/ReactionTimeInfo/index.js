import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {ThemeContext} from 'styled-components';
import {duration} from 'moment/moment';
import Icon from 'react-native-vector-icons/Ionicons';

import {Row, SecondaryTextSmall} from 'components/styled';
import FastLogo from 'assets/img/faster.svg';

const IconWrapper = styled.View`
  margin-right: 6px;
`;

const TimerIcon = ({reaction}) => {
  const theme = useContext(ThemeContext);

  if (reaction < 1800000) {
    return <FastLogo height={15} width={15} />;
  } else {
    return (
      <Icon
        name="moon"
        size={15}
        color={theme.main.backgroundColors.primaryLighterHover}
      />
    );
  }
};

function ReactionTimeInfo({reaction}) {
  return (
    <Row>
      <IconWrapper>
        <TimerIcon reaction={reaction} />
      </IconWrapper>
      <SecondaryTextSmall>
        {duration(reaction).minutes()} мин
      </SecondaryTextSmall>
    </Row>
  );
}

ReactionTimeInfo.propTypes = {
  reaction: PropTypes.number.isRequired,
};

export default ReactionTimeInfo;
