// @flow

import React, { PureComponent } from 'react';
import { toLower } from 'ramda';

import { Container, Row, Col } from 'layout';
import { AppContext } from 'components/App';

import { uploadFile } from 'utils';

import Menu from './ManageStoreMenu';

import './ManageStoreDecorator.scss';

type StateType = {
  newStoreName: ?string,
  newStoreLogo: ?string,
};

export default (OriginalComponent: any, title: string, isNewStore?: boolean) =>
  class Manage extends PureComponent<{}, StateType> {
    state: StateType = {
      newStoreName: null,
      newStoreLogo: null,
    };

    handleOnUpload = async (e: any) => {
      e.preventDefault();
      const file = e.target.files[0];
      const result = await uploadFile(file);
      if (!result.url) return;
      this.setState({ newStoreLogo: result.url });
    };

    deleteAvatar = (): void => {
      this.setState({ newStoreLogo: null });
    };

    handleNewStoreNameChange = (value: string) => {
      this.setState({ newStoreName: value });
    };

    render() {
      const { newStoreName, newStoreLogo } = this.state;
      let menuProps = {
        activeItem: toLower(title),
      };
      let formProps = { ...this.props };

      if (isNewStore) {
        menuProps = {
          ...menuProps,
          newStoreLogo,
          newStoreName,
          handleOnUpload: this.handleOnUpload,
          deleteAvatar: this.deleteAvatar,
        };
        formProps = {
          ...formProps,
          handleNewStoreNameChange: this.handleNewStoreNameChange,
          newStoreLogo,
          newStoreName,
        };
      }
      return (
        <AppContext.Consumer>
          {({ environment }) => (
            <Container>
              <Row>
                <Col sm={3} md={3} lg={2} xl={2}>
                  <Menu {...menuProps} environment={environment} />
                </Col>
                <Col sm={9} md={9} lg={10} xl={10}>
                  <div styleName="container">
                    <div styleName="header">
                      <span styleName="title">{title}</span>
                    </div>
                    <div styleName="form">
                      <OriginalComponent {...formProps} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </AppContext.Consumer>
      );
    }
  };
