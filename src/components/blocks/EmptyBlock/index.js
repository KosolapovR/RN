import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import {Column, Row, SecondaryBoldText, SecondaryText} from 'components/styled';
import BasicButton from 'components/buttons/BasicButton';
import EmptyActiveDealsIcon from 'assets/img/empty-placeholders/activity-empty-grey.svg';
import EmptyCompletedDealsIcon from 'assets/img/empty-placeholders/complete-empty-grey.svg';
import PlusIcon from 'assets/img/empty-placeholders/plus-empty-grey.svg';
import OfferIcon from 'assets/img/empty-placeholders/empty_offers-white.svg';
import SearchIcon from 'assets/img/empty-placeholders/search-empty.svg';
import NotificationsIcon from 'assets/img/notifications/notifications-icon-mobile.svg';
import FadeIn from 'components/animations/FadeIn';

const StyledColumn = styled(Column)`
  padding: 30px;
  justify-content: center;
  align-items: center;
`;

const AlignCenterText = styled(SecondaryText)`
  text-align: center;
  padding-bottom: 20px;
`;

const EmptyBlock = ({type, onClick, searchWord}) => {
  const BlockBody = () => {
    switch (type) {
      case 'activeDeals': {
        return (
          <>
            <Row paddingBottom={30}>
              <EmptyActiveDealsIcon height={72} width={72} />
            </Row>
            <SecondaryBoldText paddingBottom={15}>
              Нет активных сделок
            </SecondaryBoldText>
            <AlignCenterText>
              Чтобы начать сделку, выбирайте предложения из маркета либо
              откликайтесь на новые заявки
            </AlignCenterText>
            <BasicButton
              onClick={onClick}
              title="Найти предложения"
              color="secondary"
              containerStyles={{width: 210}}
            />
          </>
        );
      }
      case 'completedDeals': {
        return (
          <>
            <Row paddingBottom={30}>
              <EmptyCompletedDealsIcon height={72} width={72} />
            </Row>
            <SecondaryBoldText paddingBottom={15}>
              Нет завершенных сделок
            </SecondaryBoldText>
            <AlignCenterText>
              Количество завершенных сделок влияет на вашу репутацию на сервисе
              и повышает отклики на ваши объявления
            </AlignCenterText>
            <BasicButton
              onClick={onClick}
              title="Найти предложения"
              color="secondary"
              containerStyles={{width: 210}}
            />
          </>
        );
      }
      case 'subscriptions': {
        return (
          <>
            <Row paddingBottom={30}>
              <PlusIcon height={72} width={72} />
            </Row>
            <SecondaryBoldText paddingBottom={15}>
              Нет подписок
            </SecondaryBoldText>
            <AlignCenterText>
              Добавьте подписку на выгодные курсы, чтобы получать уведомления
            </AlignCenterText>
            <BasicButton
              onClick={onClick}
              title="Добавить подписку"
              color="secondary"
              containerStyles={{width: 210}}
            />
          </>
        );
      }
      case 'offers': {
        return (
          <>
            <Row paddingBottom={30}>
              <PlusIcon height={72} width={72} />
            </Row>
            <SecondaryBoldText paddingBottom={15}>
              Нет предложений о продаже
            </SecondaryBoldText>
            <AlignCenterText>
              Добавьте собственное объявления о покупке или попробуйте изменить
              сумму
            </AlignCenterText>
            <BasicButton
              onClick={onClick}
              title="Добавить объявление"
              color="secondary"
              containerStyles={{width: 210}}
            />
          </>
        );
      }
      case 'usersOffers': {
        return (
          <>
            <Row paddingBottom={30}>
              <OfferIcon height={72} width={72} />
            </Row>
            <SecondaryBoldText paddingBottom={15}>
              Добавьте свое первое объявление
            </SecondaryBoldText>
            <AlignCenterText paddingBottom={15}>
              Если вы не нашли соответствующего предложения в маркете,
              сформируйте его сами! Добавьте свое первое объявление о покупке
              или продаже криптовалюты.
            </AlignCenterText>
            <BasicButton
              onClick={onClick}
              title="Создать объявление"
              color="primary"
              containerStyles={{width: 210}}
            />
          </>
        );
      }
      case 'helpSearch': {
        return (
          <>
            <Row paddingBottom={30}>
              <SearchIcon height={72} width={72} />
            </Row>
            <AlignCenterText>
              Не найдено упоминания «{searchWord}» в статьях, попробуйте ввести
              другой запрос
            </AlignCenterText>
          </>
        );
      }
      case 'notifications': {
        return (
          <>
            <Row paddingBottom={30}>
              <NotificationsIcon height={72} width={72} />
            </Row>
            <AlignCenterText>Нет уведомлений</AlignCenterText>
          </>
        );
      }
      default: {
        return (
          <>
            <AlignCenterText>Нет результатов</AlignCenterText>
          </>
        );
      }
    }
  };

  return (
    <FadeIn>
      <StyledColumn>
        <BlockBody />
      </StyledColumn>
    </FadeIn>
  );
};

EmptyBlock.propTypes = {
  type: PropTypes.oneOf([
    'activeDeals',
    'completedDeals',
    'subscriptions',
    'offers',
    'helpSearch',
    'notifications',
    'usersOffers',
  ]).isRequired,
  onClick: PropTypes.func,
  searchWord: PropTypes.string,
};

EmptyBlock.defaultProps = {
  onClick: () => {},
  searchWord: '',
};

export default EmptyBlock;
