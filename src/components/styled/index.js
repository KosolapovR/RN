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

const CardContainer = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  padding: ${(props) =>
    typeof props.padding !== 'undefined' ? `${props.padding}px` : '0px'};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowEnd = styled(Row)`
  justify-content: flex-end;
`;

const RowSpaceBetween = styled(Row)`
  justify-content: space-between;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom : 0)};
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
  CardContainer,
  Row,
  RowSpaceBetween,
  RowEnd,
};
