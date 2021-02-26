import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';

const Container = styled.View`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius}; ;
`;

const TopBlock = styled.View`
  padding: 20px 20px 0;
  border-bottom-color: ${(props) => props.theme.main.colors.secondary};
  border-style: solid;
  border-bottom-width: 0.5px;
`;
const BottomBlock = styled.View`
  padding: 0 20px;
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
`;

const GreyText = styled.Text`
  color: ${(props) => props.theme.main.colors.secondary};
`;

const GreyTextSmall = styled(GreyText)`
  font-size: 12px;
`;
const WhiteText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
`;
const StyledIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin: 20px 0;
`;

const ExchangeIconWrapper = styled.View`
  width: 40px;
  height: 40px;
  margin: 20px 15px 20px 0;
  align-items: center;
  justify-content: center;
`;

const StyledIconSmall = styled(StyledIcon)`
  width: 25px;
  height: 25px;
`;

const OfferCard = ({
  sellCurrency,
  sellWalletAlias,
  sellWalletIcon,
  buyCurrency,
  buyWalletAlias,
  buyWalletIcon,
  isCanceled,
  isOutdated,
  limitsInfo,
  rateInfo,
}) => {
  return (
    <Container>
      <TopBlock>
        <StyledRow>
          <GreyText>Отдаю</GreyText>
          <GreyText>Получаю</GreyText>
        </StyledRow>

        <StyledRow halfOpacity={isCanceled || isOutdated}>
          <StyledRow>
            <StyledIcon source={{uri: sellWalletIcon}} />
            <View style={{marginLeft: 15}}>
              <WhiteText>{sellCurrency}</WhiteText>
              <GreyText>{sellWalletAlias}</GreyText>
            </View>
          </StyledRow>
          <StyledRow>
            <View style={{marginRight: 15, alignItems: 'flex-end'}}>
              <WhiteText>{buyCurrency}</WhiteText>
              <GreyText>{buyWalletAlias}</GreyText>
            </View>
            <StyledIcon
              source={{
                uri: buyWalletIcon,
              }}
            />
          </StyledRow>
        </StyledRow>
      </TopBlock>
      <BottomBlock>
        <StyledRow>
          <ExchangeIconWrapper>
            <StyledIconSmall
              source={{
                uri:
                  'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=010',
              }}
            />
          </ExchangeIconWrapper>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <GreyTextSmall>{rateInfo}</GreyTextSmall>
            <GreyTextSmall>{limitsInfo}</GreyTextSmall>
          </View>
          <GreyText>1</GreyText>
        </StyledRow>
      </BottomBlock>
    </Container>
  );
};

OfferCard.propTypes = {
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

OfferCard.defaultProps = {
  timerValue: '',
  isCanceled: false,
  isOutdated: false,
  isWaitingConfirm: false,
  onReject: () => {},
  onAccept: () => {},
  onFindSimilarOffers: () => {},
};

export default OfferCard;
