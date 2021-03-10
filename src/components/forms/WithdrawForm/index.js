import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import styled from 'styled-components/native';

import {maxLength, minLength, password, required} from 'shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import DropdownField from 'components/fields/DropdownField';
import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import DropdownItemWithIcon from 'components/fields/DropdownField/DropdownItemWithIcon';
import ImportedWalletIcon from 'assets/img/w-import.svg';
import {Column, Row, RowSpaceBetween, SecondaryText} from 'components/styled';
import IconButton from 'components/buttons/IconButton';
import QRScanIcon from 'assets/img/qr-white-scan.svg';
import Divider from 'components/Divider';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledForm = styled.View`
  flex-direction: column-reverse;
  flex: 1;
`;
const StyledButtonsWrapper = styled.View`
  flex: 1;
`;

const WithdrawFrom = ({handleSubmit, invalid, onCLickQR}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const onSelectCurrency = (value) => {
    if (selectedCurrency !== value) {
      setSelectedCurrency(value);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{backgroundColor: 'white'}}>
        <StyledForm>
          <StyledButtonsWrapper>
            <BasicButton
              color="primary"
              title="Продолжить"
              onClick={() => {
                handleSubmit();
              }}
              isDisabled={invalid}
            />
          </StyledButtonsWrapper>
          <Row>
            <Field
              name="mainerCommission"
              component={BasicField}
              input={{value: '0.0001'}}
              props={{
                label: 'Комиссия за транзакцию майнерам:',
                readOnly: true,
                rightSymbol: <SecondaryText>{selectedCurrency}</SecondaryText>,
              }}
              validate={[required, minLength6, maxLength30]}
            />
          </Row>
          <Divider />
          <Row>
            <Field
              name="amount"
              component={BasicField}
              props={{
                label: 'Сумма:',
                placeholder: '0',
                rightSymbol: <SecondaryText>{selectedCurrency}</SecondaryText>,
              }}
              validate={[required, minLength6, maxLength30]}
            />
          </Row>

          <RowSpaceBetween>
            <Field
              name="partnerAddress"
              component={BasicField}
              props={{
                label: 'На адрес:',
                placeholder: 'Вставьте адрес или сканируйте',
              }}
              validate={[required, minLength6, maxLength30]}
              type="text"
            />
            <IconButton
              marginLeft={10}
              onClick={onCLickQR}
              icon={<QRScanIcon paddingLeft={10} height={18} width={18} />}
            />
          </RowSpaceBetween>
          <Field
            name="currency"
            component={DropdownField}
            input={{onChange: action('onChange')}}
            props={{
              placeholder: 'Выберите кошелек',
              isDisabled: boolean('Disabled', false),
              readOnly: boolean('readOnly', false),
              dropdownItems: [
                {
                  id: 1,
                  element: (
                    <DropdownItemWithIcon
                      isLocalSvgIcon
                      text="tb1qwcx5er3ltqd9juhzk7kw5ualqfqepsufkfmnr3"
                      icon={
                        <ImportedWalletIcon
                          width={20}
                          height={20}
                          style={{marginRight: 10}}
                        />
                      }
                    />
                  ),
                  value: 'BTC',
                },
              ],
            }}
            validate={[required]}
            type="text"
          />
          <Field
            name="wallet"
            component={DropdownField}
            input={{onChange: (v) => onSelectCurrency(v)}}
            props={{
              label: 'Валюта и кошелек отправки:',
              placeholder: 'Выберите валюту',
              dropdownItems: [
                {
                  id: 1,
                  element: (
                    <DropdownItemWithIcon
                      text="BTC"
                      icon="https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png"
                    />
                  ),
                  value: 'BTC',
                },
                {
                  id: 2,
                  element: (
                    <DropdownItemWithIcon
                      text="ETH"
                      icon="https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:45:47Z_c7c004.png"
                    />
                  ),
                  value: 'ETH',
                },
                {
                  id: 3,
                  element: (
                    <DropdownItemWithIcon
                      text="TON"
                      icon="https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-02-17T15:09:09Z_bde967.jpg"
                    />
                  ),
                  value: 'TON',
                },
                {
                  id: 4,
                  element: (
                    <DropdownItemWithIcon
                      text="USDT"
                      icon="https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:50:58Z_4598c9.png"
                    />
                  ),
                  value: 'USDT',
                },
              ],
            }}
            validate={[required]}
            type="text"
          />
        </StyledForm>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

WithdrawFrom.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onResetPassword: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'withdrawFrom',
})(WithdrawFrom);
