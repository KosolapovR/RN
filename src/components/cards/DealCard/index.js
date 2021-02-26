import * as React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../../buttons/BasicButton';

const Container = styled.View`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  padding: 20px;
  border-radius: ${(props) => props.theme.main.borderRadius}; ;
`;
const StyledInfoBlock = styled.View`
  flex-direction: row;
`;
const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
`;
const StyledStatus = styled.Text`
  color: white;
  font-weight: bold;
  padding-right: 10px;
`;
const StyledOutdatedStatus = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.main.colors.secondary};
`;
const StyledCanceledStatus = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.main.colors.error};
  opacity: 0.5;
`;
const StyledAdditionalInfo = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
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
    <Container>
      <StyledRow>
        <StyledInfoBlock>
          {isOutdated ? (
            <StyledOutdatedStatus>
              Время на принятие истекло
            </StyledOutdatedStatus>
          ) : isCanceled ? (
            <StyledCanceledStatus>Сделка отменена</StyledCanceledStatus>
          ) : (
            <>
              <StyledStatus>{dealStatusText}</StyledStatus>
              <StyledAdditionalInfo>{additionalInfo}</StyledAdditionalInfo>
            </>
          )}
        </StyledInfoBlock>
        <StyledTimer>{timerValue}</StyledTimer>
      </StyledRow>

      <StyledRow halfOpacity={isCanceled || isOutdated}>
        <StyledRow>
          <StyledIcon source={{uri: sellWalletIcon}} />
          <BoldText>{sellAmount}</BoldText>
        </StyledRow>
        <StyledRow>
          <BoldText>{buyAmount}</BoldText>
          <StyledIcon
            source={{
              uri: buyWalletIcon,
            }}
          />
        </StyledRow>
      </StyledRow>

      <StyledRow>
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
      </StyledRow>
    </Container>
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
