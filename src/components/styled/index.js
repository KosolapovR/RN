// @flow
import styled from 'styled-components/native';
import * as React from 'react';

const StyledText = (styled.Text`
  line-height: 22px;
  padding-right: ${(props) =>
    typeof props.paddingRight !== 'undefined'
      ? `${props.paddingRight}px`
      : '0px'};
  padding-bottom: ${(props) =>
    typeof props.paddingBottom !== 'undefined'
      ? `${props.paddingBottom}px`
      : '0px'};
  padding-left: ${(props) =>
    typeof props.paddingLeft !== 'undefined'
      ? `${props.paddingLeft}px`
      : '0px'};
  padding-top: ${(props) =>
    typeof props.paddingTop !== 'undefined' ? `${props.paddingTop}px` : '0px'};
`: React.ComponentType<{
  paddingTop?: number,
  paddingLeft?: number,
  paddingRight?: number,
  paddingBottom?: number,
}>);
const PrimaryText: typeof StyledText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.primary};
  font-size: ${(props) => props.theme.main.fontSize.medium};
`;

const PrimarySmallText: typeof StyledText = styled(PrimaryText)`
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const PrimaryLargeText: typeof StyledText = styled(PrimaryText)`
  font-size: ${(props) => props.theme.main.fontSize.large};
`;

const PrimaryBoldText: typeof StyledText = styled(PrimaryText)`
  font-weight: bold;
`;

const PrimaryBoldSmallText: typeof StyledText = styled(PrimaryBoldText)`
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const PrimaryBoldLargeText: typeof StyledText = styled(PrimaryBoldText)`
  font-size: ${(props) => props.theme.main.fontSize.large};
`;

const PrimaryBoldLargeCenteredText: typeof StyledText = styled(
  PrimaryBoldLargeText,
)`
  text-align: center;
`;

const SecondaryText: typeof StyledText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.secondary};
`;

const SecondaryCenteredText: typeof StyledText = styled(SecondaryText)`
  text-align: center;
`;
const SecondaryBoldText: typeof StyledText = styled(SecondaryText)`
  font-weight: bold;
`;
const SecondaryBoldTextLightLarge: typeof StyledText = styled(
  SecondaryBoldText,
)`
  font-size: 16px;
`;

const SecondaryTextSmall: typeof StyledText = styled(SecondaryText)`
  font-size: 12px;
`;

const WhiteText: typeof StyledText = styled(StyledText)`
  color: #ffffff;
`;

const WhiteBoldText: typeof StyledText = styled(WhiteText)`
  font-weight: bold;
`;
const WhiteExtraLargeText: typeof StyledText = styled(WhiteText)`
  font-size: 18px;
`;

const GreenText: typeof StyledText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.green};
`;

const BlueText: typeof StyledText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.blue};
  font-size: ${(props) => props.theme.main.fontSize.medium};
`;

const RedText: typeof StyledText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.error};
`;

const BlueBoldText: typeof StyledText = styled(BlueText)`
  font-weight: bold;
`;

const CardContainer: typeof CardContainer = styled.TouchableOpacity`
  margin-right: ${(props) =>
    typeof props.marginRight !== 'undefined'
      ? `${props.marginRight}px`
      : '0px'};
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  padding: ${(props) =>
    typeof props.padding !== 'undefined' ? `${props.padding}px` : '0px'};
`;

const Column: typeof Column = styled.View``;
const ColumnAlignCenter: typeof Column = styled(Column)`
  align-items: center;
`;

const CenterColumn: typeof Column = styled(ColumnAlignCenter)`
  justify-content: center;
  flex: 1;
`;

const Row: typeof Column = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${(props) =>
    props.paddingBottom ? `${props.paddingBottom}px` : 0};
`;

const RowEnd: typeof Column = styled(Row)`
  justify-content: flex-end;
`;

const RowSpaceBetween: typeof Column = styled(Row)`
  justify-content: space-between;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
`;

const RowSpaceAround: typeof Column = styled(Row)`
  justify-content: space-around;
`;

const ModalBody: typeof Column = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.main.backgroundColors.primary};
  border-bottom-left-radius: ${(props) => props.theme.main.borderRadius};
  border-bottom-right-radius: ${(props) => props.theme.main.borderRadius};
`;

export {
  PrimaryText,
  PrimarySmallText,
  PrimaryLargeText,
  PrimaryBoldText,
  PrimaryBoldSmallText,
  PrimaryBoldLargeText,
  PrimaryBoldLargeCenteredText,
  SecondaryText,
  SecondaryCenteredText,
  SecondaryBoldText,
  SecondaryTextSmall,
  SecondaryBoldTextLightLarge,
  WhiteText,
  WhiteBoldText,
  WhiteExtraLargeText,
  GreenText,
  BlueText,
  BlueBoldText,
  RedText,
  CardContainer,
  Column,
  ColumnAlignCenter,
  CenterColumn,
  Row,
  RowSpaceBetween,
  RowSpaceAround,
  RowEnd,
  ModalBody,
};
