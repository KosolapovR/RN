import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import BasicButton from 'components/buttons/BasicButton';
import {
  CardContainer,
  PrimaryText,
  Row,
  RowEnd,
  RowSpaceBetween,
  SecondaryBoldText,
  WhiteBoldText,
} from 'components/styled';

const StyledCanceledStatus = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.main.colors.error};
  opacity: 0.5;
`;

const StyledTimer = styled.Text`
  color: ${(props) => props.theme.main.colors.orange};
  font-weight: bold;
`;
const StyledIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin: 20px 0;
`;

const BoldText = styled.Text`
  color: white;
  font-weight: bold;
  padding: 0 10px;
`;

const DealCard = ({
  sellAmount,
  buyAmount,
  sellWalletIcon,
  buyWalletIcon,
  dealStatusText,
  isCanceled,
  isOutdated,
  isWaitingConfirm,
  additionalInfo,
  timerValue,
  onReject,
  onAccept,
  onFindSimilarOffers,
}) => {
  return (
    <CardContainer padding={20}>
      <RowSpaceBetween>
        <Row>
          {isOutdated ? (
            <SecondaryBoldText>Время на принятие истекло</SecondaryBoldText>
          ) : isCanceled ? (
            <StyledCanceledStatus>Сделка отменена</StyledCanceledStatus>
          ) : (
            <>
              <WhiteBoldText paddingRight={10}>{dealStatusText}</WhiteBoldText>
              <PrimaryText>{additionalInfo}</PrimaryText>
            </>
          )}
        </Row>
        <StyledTimer>{timerValue}</StyledTimer>
      </RowSpaceBetween>

      <RowSpaceBetween halfOpacity={isCanceled || isOutdated}>
        <Row>
          <StyledIcon source={{uri: sellWalletIcon}} />
          <BoldText>{sellAmount}</BoldText>
        </Row>
        <RowEnd>
          <BoldText>{buyAmount}</BoldText>
          <StyledIcon
            source={{
              uri: buyWalletIcon,
            }}
          />
        </RowEnd>
      </RowSpaceBetween>

      <Row>
        {isWaitingConfirm ? (
          <BasicButton
            title="Ожидание подтверждения"
            color="secondary"
            isDisabled={true}
            onClick={() => {}}
            containerStyles={{flex: 1}}
          />
        ) : isOutdated || isCanceled ? (
          <BasicButton
            title="Найти похожие предложения"
            color="transparent-with-border"
            onClick={onFindSimilarOffers}
            containerStyles={{flex: 1}}
          />
        ) : (
          <>
            <BasicButton
              title="Отклонить"
              color="secondary"
              onClick={onReject}
              containerStyles={{flex: 1, marginRight: 20}}
            />
            <BasicButton
              title="Подтвердить"
              color="primary"
              onClick={onAccept}
              containerStyles={{flex: 1}}
            />
          </>
        )}
      </Row>
    </CardContainer>
  );
};

DealCard.propTypes = {
  sellAmount: PropTypes.string.isRequired,
  buyAmount: PropTypes.string.isRequired,
  sellWalletIcon: PropTypes.string.isRequired,
  buyWalletIcon: PropTypes.string.isRequired,
  dealStatusText: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string.isRequired,
  timerValue: PropTypes.string,
  isCanceled: PropTypes.bool,
  isOutdated: PropTypes.bool,
  isWaitingConfirm: PropTypes.bool,
  onReject: PropTypes.func,
  onAccept: PropTypes.func,
  onFindSimilarOffers: PropTypes.func,
};

DealCard.defaultProps = {
  timerValue: '',
  isCanceled: false,
  isOutdated: false,
  isWaitingConfirm: false,
  onReject: () => {},
  onAccept: () => {},
  onFindSimilarOffers: () => {},
};

export default DealCard;
