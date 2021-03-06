import React from 'react';

import { Row, Col } from 'layout';
import { Icon } from 'components/Icon';

import './StoresHeader.scss';

import t from './i18n';

type PropsType = {
  category: { id: string, label: string },
  onFilter: () => void,
  title: string,
  searchValue: any,
};

const StoresHeader = ({
  category,
  onFilter,
  title,
  searchValue,
}: PropsType) => (
  <Row>
    <span
      onClick={onFilter}
      onKeyPress={() => {}}
      role="button"
      styleName="container"
      tabIndex="-1"
    >
      <Icon type="controls" />
      <span>{t.filters}</span>
    </span>
    <Col sm={2} md={2} lg={2} xl={2}>
      <div styleName="countInfo">
        {title}
        {searchValue && (
          <span>
            {' '}
            {t.with} {searchValue} {t.inTheTitle}
          </span>
        )}
      </div>
    </Col>
    <Col sm={10} md={10} lg={10} xl={10}>
      <div styleName="breadcrumbs">
        {t.allStores}
        {category && ` / ${category.label}`}
      </div>
    </Col>
  </Row>
);

export default StoresHeader;
