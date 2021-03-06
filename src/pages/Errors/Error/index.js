// @flow strict

import React, { PureComponent } from 'react';
import { withRouter, routerShape } from 'found';

import { Button } from 'components/common/Button';

import Logo from '../svg/logo.svg';
import ErrorImage from '../svg/error.svg';

import '../styles.scss';

import t from './i18n';

type PropsType = {
  router: routerShape,
};

class Error extends PureComponent<PropsType> {
  handleToMainPage = () => {
    this.props.router.replace('/');
  };

  render() {
    return (
      <div styleName="container">
        <div styleName="logoWrapper">
          <div styleName="logo">
            <Logo />
          </div>
        </div>
        <div styleName="messageWrapper">
          <div styleName="image">
            <ErrorImage />
          </div>
          <div styleName="text">
            {t.oopsSomethingGoneWrong}n<br />
            {t.crushed}
          </div>
          <div styleName="button">
            <Button
              big
              type="button"
              onClick={this.handleToMainPage}
              dataTest="errorPageButton"
            >
              {t.startFromMainPage}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Error);
