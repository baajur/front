// @flow

import React, { Component } from 'react';
import { omit, propOr } from 'ramda';

import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { AddressForm } from 'components/AddressAutocomplete';

import type { FormErrorsType } from 'types';

import './Form.scss';

import t from './i18n';

type AddressFullType = {
  administrativeAreaLevel1: ?string,
  administrativeAreaLevel2: ?string,
  country: string,
  countryCode: string,
  locality: ?string,
  political: ?string,
  postalCode: string,
  route: ?string,
  streetNumber: ?string,
  value: ?string,
};

type PropsType = {
  isLoading: boolean,
  name: string,
  addressFull: AddressFullType,
  handleCancel: () => void,
  formErrors: {
    [string]: Array<string>,
  },
  handleSave: (data: {
    name: string,
    addressFull: AddressFullType,
  }) => void,
};

type StateType = {
  name: string,
  addressFull: AddressFullType,
  formErrors: FormErrorsType,
};

class Form extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      name: props.name || '',
      addressFull: props.addressFull,
      formErrors: props.formErrors,
    };
  }

  componentWillReceiveProps(nextProps: PropsType) {
    const currentFormErrors = this.state.formErrors;
    const nextFormErrors = nextProps.formErrors;
    if (currentFormErrors !== nextFormErrors) {
      this.setState({ formErrors: nextFormErrors });
    }
  }

  handleInputChange = (e: any) => {
    this.setState({ formErrors: omit(['name'], this.state.formErrors) });
    const { value } = e.target;
    if (value.length > 50) {
      return;
    }
    this.setState({
      name: value,
    });
  };

  handleUpdateAddressFull = (addressFull: AddressFullType) => {
    this.setState({
      addressFull: {
        ...this.state.addressFull,
        ...addressFull,
      },
    });
  };

  render() {
    const { isLoading, handleSave, handleCancel } = this.props;
    const { name, addressFull, formErrors } = this.state;
    return (
      <div styleName="form">
        <div styleName="formItem storageName">
          <Input
            id="name"
            value={name || ''}
            label={t.labelStorageName}
            onChange={this.handleInputChange}
            errors={propOr(null, 'name', formErrors)}
            limit={50}
            fullWidth
          />
        </div>
        <div styleName="formItem">
          <div styleName="subtitle">{t.storageAddress}</div>
          <div styleName="address">
            <AddressForm
              isOpen
              onChangeData={this.handleUpdateAddressFull}
              country={addressFull.country}
              address={addressFull.value}
              addressFull={addressFull}
            />
          </div>
        </div>
        <div styleName="formItem">
          <div styleName="buttons">
            <Button
              big
              onClick={() => {
                handleSave({ name, addressFull });
              }}
              isLoading={isLoading}
              dataTest="saveStorageButton"
            >
              {t.save}
            </Button>
            <button
              styleName="cancelButton"
              onClick={handleCancel}
              data-test="cancelSaveStorageButton"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
