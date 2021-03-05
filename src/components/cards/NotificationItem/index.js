import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Column, PrimaryText, Row, SecondaryText} from 'components/styled';
import moment from 'moment/moment';

const Container = styled.View`
  height: 72px;
  padding: 15px;
  background-color: ${(props) =>
    props.read
      ? props.theme.main.backgroundColors.primary
      : props.theme.main.backgroundColors.primaryLighter};
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 3px;
  border-color: #fffcfc22;
  border-left-color: ${(props) =>
    props.read
      ? props.theme.main.backgroundColors.primary
      : props.theme.main.colors.orange};
`;

function NotificationItem({
  notification,
  handleNotificationClick,
  getNotificationIcon,
  getNotificationText,
}) {
  const Notification = () => (
    <Container read={notification.readed}>
      <Row>
        <Column paddingRight={15}>{getNotificationIcon(notification)}</Column>
        <Column>
          <PrimaryText>{getNotificationText(notification)}</PrimaryText>
          <SecondaryText>{moment(notification.date).fromNow()}</SecondaryText>
        </Column>
      </Row>
    </Container>
  );

  return handleNotificationClick ? (
    <TouchableOpacity onPress={handleNotificationClick(notification)}>
      <Notification />
    </TouchableOpacity>
  ) : (
    <Notification />
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  handleNotificationClick: PropTypes.func,
  getNotificationIcon: PropTypes.func.isRequired,
  getNotificationText: PropTypes.func.isRequired,
};
NotificationItem.defaultProps = {
  handleNotificationClick: null,
};

export default NotificationItem;
