import styled from 'styled-components/native';

const StyledText = styled.Text`
  padding-right: ${(props) =>
    typeof props.paddingRight !== 'undefined'
      ? `${props.paddingRight}px`
      : '0px'};
  padding-bottom: ${(props) =>
    typeof props.paddingBottom !== 'undefined'
      ? `${props.paddingBottom}px`
      : '0px'};
`;
const PrimaryText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.primary};
  font-size: ${(props) => props.theme.main.fontSize.medium};
`;

const PrimarySmallText = styled(PrimaryText)`
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const PrimaryLargeText = styled(PrimaryText)`
  font-size: ${(props) => props.theme.main.fontSize.large};
`;

const PrimaryBoldText = styled(PrimaryText)`
  font-weight: bold;
`;

const PrimaryBoldSmallText = styled(PrimaryBoldText)`
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const PrimaryBoldLargeText = styled(PrimaryBoldText)`
  font-size: ${(props) => props.theme.main.fontSize.large};
`;

const SecondaryText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.secondary};
`;
const SecondaryBoldText = styled(SecondaryText)`
  font-weight: bold;
`;

const SecondaryTextSmall = styled(SecondaryText)`
  font-size: 12px;
`;

const WhiteText = styled(StyledText)`
  color: #ffffff;
`;

const WhiteBoldText = styled(WhiteText)`
  font-weight: bold;
`;
const WhiteExtraLargeText = styled(WhiteText)`
  font-size: 18px;
`;

const GreenText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.green};
`;

const BlueText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.blue};
`;

const RedText = styled(StyledText)`
  color: ${(props) => props.theme.main.colors.error};
`;

const BlueBoldText = styled(BlueText)`
  font-weight: bold;
`;

const CardContainer = styled.TouchableOpacity`
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

const Column = styled.View``;
const ColumnAlignCenter = styled(Column)`
  align-items: center;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${(props) =>
    props.paddingBottom ? `${props.paddingBottom}px` : 0};
`;

const RowEnd = styled(Row)`
  justify-content: flex-end;
`;

const RowSpaceBetween = styled(Row)`
  justify-content: space-between;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
`;

const RowSpaceAround = styled(Row)`
  justify-content: space-around;
`;

const ModalBody = styled.View`
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
  SecondaryText,
  SecondaryBoldText,
  SecondaryTextSmall,
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
  Row,
  RowSpaceBetween,
  RowSpaceAround,
  RowEnd,
  ModalBody,
};
