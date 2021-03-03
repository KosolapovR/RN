import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRef, useState} from 'react';
import IconButton from '../../buttons/IconButton';
import Popover from 'react-native-popover-view';
import PauseIcon from '../../../assets/img/offer/pause-grey.svg';
import EditIcon from '../../../assets/img/edit-mobile.svg';
import CopyIcon from '../../../assets/img/copy-grey.svg';
import PopoverContent from '../../blocks/PopoverContent';
import {CardContainer} from '../../styled';

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

const GreyTextSmall = styled.Text`
  color: ${(props) => props.theme.main.colors.secondary};
  font-size: 12px;
`;
const WhiteText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
`;

const PrimaryText = styled.Text`
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

const StyledIconSmall = styled.Image`
  margin: 20px 0;
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
  isPaused,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const touchable = useRef();

  const popoverItems = [
    {
      id: 1,
      element: (
        <>
          <PauseIcon width={15} height={15} marginRight={10} />
          <View>
            <WhiteText>Приостановить объявление</WhiteText>
          </View>
        </>
      ),
      onClick: () => {
        setShowPopover(false);
      },
    },
    {
      id: 2,
      element: (
        <>
          <CopyIcon width={15} height={15} marginRight={10} />
          <View>
            <WhiteText> Скопировать ссылку</WhiteText>
          </View>
        </>
      ),
      onClick: () => {
        setShowPopover(false);
      },
    },
    {
      id: 3,
      element: (
        <>
          <EditIcon width={15} height={15} marginRight={10} />
          <View>
            <WhiteText> Редактировать</WhiteText>
          </View>
        </>
      ),
      onClick: () => {
        setShowPopover(false);
      },
    },
  ];

  if (isPaused) {
    popoverItems.shift();
  }

  return (
    <CardContainer>
      <TopBlock>
        <StyledRow>
          <GreyText>Отдаю</GreyText>
          <GreyText>Получаю</GreyText>
        </StyledRow>
        <StyledRow halfOpacity={isCanceled || isOutdated}>
          <StyledRow>
            <StyledIcon source={{uri: sellWalletIcon}} />
            <View style={{marginLeft: 15}}>
              <PrimaryText>{sellCurrency}</PrimaryText>
              <GreyText>{sellWalletAlias}</GreyText>
            </View>
          </StyledRow>
          <StyledRow>
            <View style={{marginRight: 15, alignItems: 'flex-end'}}>
              <PrimaryText>{buyCurrency}</PrimaryText>
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
          <View
            style={{flex: 1, justifyContent: 'flex-start', paddingRight: 20}}>
            <GreyTextSmall>{rateInfo}</GreyTextSmall>
            <GreyTextSmall>{limitsInfo}</GreyTextSmall>
          </View>
          {isPaused && (
            <IconButton
              onClick={() => {}}
              icon={<PauseIcon width={14} height={16} marginRight={20} />}
            />
          )}

          <IconButton
            dinamicRef={touchable}
            onClick={() => setShowPopover(true)}
            icon={
              <FontAwesome5 name="ellipsis-v" size={16} color={'#b1b1b1'} />
            }
          />
          <Popover
            popoverStyle={{backgroundColor: 'transparent'}}
            arrowStyle={{backgroundColor: 'transparent'}}
            backgroundStyle={{backgroundColor: 'transparent'}}
            from={touchable}
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}>
            <PopoverContent items={popoverItems} />
          </Popover>
        </StyledRow>
      </BottomBlock>
    </CardContainer>
  );
};

OfferCard.propTypes = {
  sellCurrency: PropTypes.string.isRequired,
  sellWalletAlias: PropTypes.string.isRequired,
  sellWalletIcon: PropTypes.string,
  buyCurrency: PropTypes.string.isRequired,
  buyWalletAlias: PropTypes.string.isRequired,
  buyWalletIcon: PropTypes.string,
  limitsInfo: PropTypes.string.isRequired,
  rateInfo: PropTypes.string.isRequired,
  isPaused: PropTypes.bool,
};

OfferCard.defaultProps = {
  isPaused: false,
  sellWalletIcon: '',
  buyWalletIcon: '',
};

export default OfferCard;
