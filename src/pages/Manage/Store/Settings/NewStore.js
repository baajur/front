// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { assocPath, pathOr, toUpper, isEmpty } from 'ramda';
import { withRouter } from 'found';

import { currentUserShape } from 'utils/shapes';
import { Page } from 'components/App';
import { ManageStore } from 'pages/Manage/Store';
import { log, fromRelayError } from 'utils';
import { withShowAlert } from 'components/App/AlertContext';

import { CreateStoreMutation } from 'relay/mutations';
import type { MutationParamsType } from 'relay/mutations/CreateStoreMutation';

import type { AddAlertInputType } from 'components/App/AlertContext';

import Form from './Form';

type StateType = {
  serverValidationErrors: any,
  logoUrl?: string,
  isLoading: boolean,
};

type PropsType = {
  showAlert: (input: AddAlertInputType) => void,
};

class NewStore extends Component<PropsType, StateType> {
  state: StateType = {
    serverValidationErrors: {},
    isLoading: false,
  };

  handleShopCurrency = (shopCurrency: { id: string, label: string }) => {
    this.setState(assocPath(['form', 'currencyId'], +shopCurrency.id));
  };

  handleSave = ({ form, optionLanguage }) => {
    const { environment, currentUser } = this.context;
    const {
      name,
      longDescription,
      shortDescription,
      defaultLanguage,
      slug,
      slogan,
    } = form;
    const { logoUrl } = this.state;
    this.setState(() => ({ isLoading: true, serverValidationErrors: {} }));

    const params: MutationParamsType = {
      input: {
        clientMutationId: '',
        userId: parseInt(currentUser.rawId, 10),
        name: [{ lang: optionLanguage, text: name }],
        // $FlowIgnoreMe
        defaultLanguage: toUpper(defaultLanguage),
        longDescription: [{ lang: optionLanguage, text: longDescription }],
        shortDescription: [{ lang: optionLanguage, text: shortDescription }],
        slug,
        slogan,
        logo: logoUrl,
        addressFull: {},
      },
      environment,
      onCompleted: (response: ?Object, errors: ?Array<any>) => {
        log.debug({ response, errors });

        const relayErrors = fromRelayError({ source: { errors } });
        log.debug({ relayErrors });

        // $FlowIgnoreMe
        const validationErrors = pathOr({}, ['100', 'messages'], relayErrors);
        if (!isEmpty(validationErrors)) {
          this.setState({ serverValidationErrors: validationErrors });
          return;
        }

        // $FlowIgnoreMe
        const statusError: string = pathOr('', ['100', 'status'], relayErrors);
        if (!isEmpty(statusError)) {
          this.props.showAlert({
            type: 'danger',
            text: `Error: "${statusError}"`,
            link: { text: 'Close.' },
          });
          return;
        }

        // $FlowIgnoreMe
        const parsingError = pathOr(null, ['300', 'message'], relayErrors);
        if (parsingError) {
          log.debug('parsingError:', { parsingError });
          this.props.showAlert({
            type: 'danger',
            text: 'Something going wrong :(',
            link: { text: 'Close.' },
          });
          return;
        }
        this.props.showAlert({
          type: 'success',
          text: 'Store created!',
          link: { text: '' },
        });
      },
      onError: (error: Error) => {
        log.error(error);
        this.props.showAlert({
          type: 'danger',
          text: 'Something going wrong.',
          link: { text: 'Close.' },
        });
      },
    };
    CreateStoreMutation.commit(params);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Form
        onSave={this.handleSave}
        isLoading={isLoading}
        serverValidationErrors={this.state.serverValidationErrors}
      />
    );
  }
}

export default withShowAlert(
  withRouter(Page(ManageStore(NewStore, 'Settings'))),
);

NewStore.contextTypes = {
  environment: PropTypes.object.isRequired,
  directories: PropTypes.object,
  currentUser: currentUserShape,
  showAlert: PropTypes.func,
};