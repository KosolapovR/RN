import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';

import BasicButton from '../../components/buttons/BasicButton';

import BenefitLogo1 from '../../assets/img/benefits/benefits-6.1.svg';
import BenefitLogo2 from '../../assets/img/benefits/benefits-5.1.svg';
import BenefitLogo3 from '../../assets/img/faq-robot.1.svg';

const Wrapper = styled.View`
  background-color: #141416;
  flex: 1;
  padding: 20px;
`;

const CarouselWrapper = styled.View`
  flex: 1;
  margin-bottom: 20%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const SlideInfo = styled.View`
  align-self: flex-end;
`;
const SlideTitle = styled.Text`
  font-weight: bold;
  color: #b6b6b6;
  font-size: 18px;
  max-width: 300px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 15px;
`;

const SlideText = styled.Text`
  color: #b6b6b6;
  font-size: 14px;
`;

const SlideImage = styled.Text`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-self: center;
  align-content: center;
`;

const Buttons = styled.View`
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
`;

const _renderItem = ({item, index}) => {
  return (
    <CarouselWrapper>
      <SlideImage>{item.img}</SlideImage>
      <SlideInfo>
        <SlideTitle>{item.title}</SlideTitle>
        <SlideText>{item.text}</SlideText>
      </SlideInfo>
    </CarouselWrapper>
  );
};

const data = [
  {
    title: 'Покупайте и продавайте криптовалюту',
    text: '9 криптовалют, 300 банков и 50 платежных систем для обмена',
    img: (
      <BenefitLogo1
        height={Dimensions.get('window').width * 0.5}
        width={Dimensions.get('window').width * 0.5}
      />
    ),
  },
  {
    title: 'Безопасность и поддержка 24/7',
    text:
      'Абсолютная анонимность. Защита на всех уровнях. Открыто для Tor Browser',
    img: (
      <BenefitLogo2
        height={Dimensions.get('window').width * 0.55}
        width={Dimensions.get('window').width * 0.55}
      />
    ),
  },
  {
    title: 'Выгодные и быстрые обмены',
    text:
      'Низкая комиссия. Более 20 бирж. Автоматические сделки для платежных систем',
    img: (
      <BenefitLogo3
        height={Dimensions.get('window').width * 0.55}
        width={Dimensions.get('window').width * 0.55}
      />
    ),
  },
];

const InitialScreen = ({navigation}) => {
  const goToSignIn = () => {
    navigation.navigate('Auth', {
      screen: 'SignIn',
    });
  };

  const goToSignUp = () => {
    navigation.navigate({
      name: 'SignUp',
    });
  };

  return (
    <Wrapper>
      <Carousel
        itemWidth={Dimensions.get('window').width * 0.9}
        sliderWidth={Dimensions.get('window').width * 0.9}
        renderItem={_renderItem}
        data={data}
      />
      <Buttons>
        <BasicButton
          onClick={goToSignUp}
          title="Регистрация"
          color={'primary'}
        />
        <BasicButton onClick={goToSignIn} title="Войти" color="secondary" />
      </Buttons>
    </Wrapper>
  );
};

export default InitialScreen;
