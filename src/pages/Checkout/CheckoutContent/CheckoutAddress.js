// @flow

import React from 'react';
import { pathOr } from 'ramda';

import { Checkbox } from 'components/common/Checkbox';
import { RadioButton } from 'components/common/RadioButton';
import { Select } from 'components/common/Select';
import { Input } from 'components/common/Input';
import { Container, Row, Col } from 'layout';
import { AddressForm } from 'components/AddressAutocomplete';

import type { AddressFullType } from 'components/AddressAutocomplete/AddressForm';

import { getAddressFullByValue, addressesToSelect } from '../utils';

import AddressInfo from './AddressInfo';

import './CheckoutAddress.scss';

type PropsType = {
  deliveryAddresses: any,
  onChangeOrderInput: Function,
  onChangeAddressType: Function,
  onChangeSaveCheckbox: Function,
  orderInput: any,
  me: any,
  isAddressSelect: boolean,
  isNewAddress: boolean,
  saveAsNewAddress: boolean,
};

class CheckoutContent extends React.Component<PropsType> {
  handleOnSelectAddress = (item: any) => {
    const { onChangeOrderInput, orderInput, deliveryAddresses } = this.props;
    const addressFull = getAddressFullByValue(deliveryAddresses, item.label);
    onChangeOrderInput({
      ...orderInput,
      addressFull,
    });
  };

  handleChangeReceiver = (e: any) => {
    const { onChangeOrderInput, orderInput } = this.props;
    onChangeOrderInput({
      ...orderInput,
      receiverName: e.target.value,
    });
  };

  handleOnCheckExistingAddress = () => {
    // $FlowIgnore
    this.setState(({ isCheckedExistingAddress }) => ({
      isCheckedExistingAddress: !isCheckedExistingAddress,
    }));
  };

  handleOnCheckNewAddress = () => {
    // $FlowIgnore
    this.setState(({ isCheckedNewAddress }) => ({
      isCheckedNewAddress: !isCheckedNewAddress,
    }));
  };

  handleInputChange = (id: string) => (e: any) => {
    const { onChangeOrderInput, orderInput } = this.props;
    const { value } = e.target;
    onChangeOrderInput({
      ...orderInput,
      addressFull: {
        ...orderInput.addressFull,
        [id]: value,
      },
    });
  };

  handleChangeData = (addressFullData: AddressFullType): void => {
    const { onChangeOrderInput, orderInput } = this.props;
    onChangeOrderInput({
      ...orderInput,
      addressFull: addressFullData,
    });
  };

  render() {
    const {
      me,
      isAddressSelect,
      isNewAddress,
      saveAsNewAddress,
      orderInput,
      onChangeAddressType,
      onChangeSaveCheckbox,
      deliveryAddresses,
    } = this.props;

    const { addressFull } = orderInput;

    // $FlowIgnore
    const addressValue = pathOr(
      null,
      ['orderInput', 'addressFull', 'value'],
      this.props,
    );
    const items = addressesToSelect(deliveryAddresses);
    return (
      <Container correct>
        <Row>
          <Col size={12} xl={6}>
            <div styleName="addressWrapper">
              <Row>
                <Col size={12}>
                  <div styleName="title">Delivery info</div>
                  <div styleName="receiverContainer">
                    <Input
                      fullWidth
                      id="receiverName"
                      label="Receiver name"
                      onChange={this.handleChangeReceiver}
                      value={orderInput.receiverName}
                      limit={50}
                    />
                  </div>
                  <div styleName="selectAddressContainer">
                    <RadioButton
                      id="existingAddressCheckbox"
                      label="choose your address"
                      isChecked={isAddressSelect}
                      onChange={onChangeAddressType}
                    />
                    {isAddressSelect && (
                      <div styleName="selectWrapper">
                        Address
                        <div>
                          <Select
                            items={items}
                            activeItem={
                              addressValue && {
                                id: addressValue,
                                label: addressValue,
                              }
                            }
                            onSelect={this.handleOnSelectAddress}
                            forForm
                            containerStyle={{ width: '26rem' }}
                            dataTest="selectExistingAddress"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
                <Col size={12} xlHidden>
                  {orderInput.addressFull.value && (
                    <AddressInfo
                      addressFull={orderInput.addressFull}
                      receiverName={
                        orderInput.receiverName ||
                        `${me.firstName} ${me.lastName}`
                      }
                      email={me.email}
                    />
                  )}
                </Col>
                <Col size={12} sm={9} md={8} xl={12}>
                  <div>
                    <RadioButton
                      id="newAddressCheckbox"
                      label="Or fill fields below and save as address"
                      isChecked={isNewAddress}
                      onChange={onChangeAddressType}
                    />
                    {isNewAddress && (
                      <div styleName="formWrapper">
                        <AddressForm
                          isOpen
                          onChangeData={this.handleChangeData}
                          country={addressFull ? addressFull.country : null}
                          address={addressFull ? addressFull.value : null}
                          addressFull={addressFull}
                        />
                        <div styleName="saveAddressWrapper">
                          <Checkbox
                            id="saveAddressCheckbox"
                            label="Save as a new address"
                            isChecked={saveAsNewAddress}
                            onChange={onChangeSaveCheckbox}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col size={6} xlVisibleOnly>
            {orderInput.addressFull.value && (
              <div styleName="addressInfoContainer">
                <AddressInfo
                  addressFull={orderInput.addressFull}
                  receiverName={
                    orderInput.receiverName || `${me.firstName} ${me.lastName}`
                  }
                  email={me.email}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CheckoutContent;
