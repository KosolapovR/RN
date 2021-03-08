import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import {
  Column,
  PrimaryBoldLargeText,
  PrimaryText,
  Row,
  SecondaryText,
} from 'components/styled';
import RatingInfo from 'components/cards/MarketItemCard/RatingInfo';
import BasicButton from 'components/buttons/BasicButton';
import Divider from 'components/Divider';

const Container = styled(Column)`
  position: relative;
  padding-bottom: 20px;
`;

const StyledView = styled(Column)`
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 72px;
  margin-bottom: 15px;
`;

function ProfileTopBlock({
  onEdit,
  userName,
  commentsCount,
  rating,
  dealsCount,
}) {
  return (
    <Container>
      <StyledView>
        <Avatar
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <PrimaryBoldLargeText paddingBottom={10}>
          {userName}
        </PrimaryBoldLargeText>
        <Row>
          <PrimaryText>{commentsCount} отзывов</PrimaryText>
          <RatingInfo rating={rating} />
          <SecondaryText paddingLeft={5}>{dealsCount} сделок</SecondaryText>
        </Row>
      </StyledView>
      <BasicButton
        onClick={onEdit}
        title="Редактировать профиль"
        color="secondary"
      />
      <Divider black fullWidth height={5} />
    </Container>
  );
}

ProfileTopBlock.propTypes = {
  userName: PropTypes.string.isRequired,
  dealsCount: PropTypes.number,
  commentsCount: PropTypes.number,
  rating: PropTypes.number,
};

ProfileTopBlock.defaultProps = {
  dealsCount: 0,
  commentsCount: 0,
  rating: 0,
};

export default ProfileTopBlock;
