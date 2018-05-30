// @flow

import React, { PureComponent } from 'react';
import { map, pathOr, whereEq, filter } from 'ramda';

import { findCategory } from 'utils';
import { Input } from 'components/common/Input';
import { Textarea } from 'components/common/Textarea';
import { CategorySelector } from 'components/CategorySelector';
import { Button } from 'components/common/Button';
import { UploadWrapper } from 'components/Upload';
import { Icon } from 'components/Icon';

import AttributesForm from './AttributesForm';
import ProductsUploader from './ProductsUploader';

import type { AttrValueType } from './AttributesForm';
import type { BaseProductNodeType } from '../Wizard';

import './Form.scss';

type CategoriesTreeType = {
  rawId: number,
  level: number,
  children: ?Array<CategoriesTreeType>,
};

type PropsType = {
  categoryId?: ?number,
  categories: CategoriesTreeType,
  onChange: ({
    [name: string]: any,
  }) => void,
  data: BaseProductNodeType,
  onUpload: (type: string, e: any) => Promise<*>,
  onSave: () => void,
  onClose: () => void,
};

class ThirdForm extends PureComponent<PropsType> {
  // TODO: remove useless function
  handleChangeBaseProductState = (e: any) => {
    const { data } = this.props;
    const {
      target: { value, name },
    } = e;
    this.props.onChange({
      ...data,
      [name]: value,
    });
  };

  handleChangeProductState = (e: any) => {
    const { data } = this.props;
    const {
      target: { value, name },
    } = e;
    this.props.onChange({
      ...data,
      product: {
        ...data.product,
        [name]: name === 'vendorCode' ? value : parseInt(value, 10),
      },
    });
  };

  handleAttributesChange = (attrs: Array<AttrValueType>) => {
    const { onChange } = this.props;
    onChange({ attributes: attrs });
  };

  handleRemoveAddtionalPhoto = (url: string) => {
    const { onChange, data } = this.props;
    onChange({
      product: {
        ...data.product,
        additionalPhotos: [
          ...filter(u => u !== url, data.product.additionalPhotos),
        ],
      },
    });
  };

  handleOnRemoveMainPhoto = () => {
    const { onChange, data } = this.props;
    onChange({
      product: {
        ...data.product,
        photoMain: '',
      },
    });
  };

  prepareValuesForAttributes = (
    attributes: Array<{ value: string, attribute: { rawId: number } }>,
  ) =>
    map(
      item => ({ value: item.value, attrId: item.attribute.rawId }),
      attributes,
    );

  checkForSave = () => {
    const { data } = this.props;
    const isNotReady =
      !data.name ||
      !data.shortDescription ||
      !data.categoryId ||
      !data.product.price ||
      !data.product.vendorCode;
    if (isNotReady) {
      return true;
    }
    return false;
  };

  renderAttributes = () => {
    const { categoryId, attributes } = this.props.data;
    const catObj = findCategory(
      whereEq({ rawId: parseInt(categoryId, 10) }),
      this.props.categories,
    );
    return (
      catObj &&
      catObj.getAttributes && (
        <div styleName="section">
          <div styleName="sectionName">Properties</div>
          <div styleName="attributesForm">
            <AttributesForm
              attributes={catObj.getAttributes}
              values={attributes}
              onChange={this.handleAttributesChange}
            />
          </div>
        </div>
      )
    );
  };

  render() {
    const { data, onSave, onClose, onUpload } = this.props;
    // $FlowIgnoreMe
    const categoryId = pathOr(null, ['data', 'categoryId'], this.props);
    console.log('>>> Form 3 render: ', { data });
    return (
      <div styleName="wrapper">
        <div styleName="formWrapper">
          <div styleName="headerTitle">Add new product</div>
          <div styleName="headerDescription">
            Fill up the forms below to show up as many attributes of your good
            to make it clear for buyer
          </div>
          <div styleName="form">
            <div styleName="section">
              <div styleName="input">
                <Input
                  id="name"
                  value={data.name}
                  label="Product name"
                  onChange={this.handleChangeBaseProductState}
                  fullWidth
                />
              </div>
              <div styleName="input">
                <Textarea
                  id="shortDescription"
                  value={data.shortDescription}
                  label="Short description"
                  onChange={this.handleChangeBaseProductState}
                  fullWidth
                />
              </div>
            </div>
            <div styleName="section">
              <div styleName="sectionName">Product main photo</div>
              <div styleName="uploadersWrapper">
                <div styleName="uploadedPhotoList">
                  {(data.product.photoMain && (
                    <div
                      styleName="uploadItem"
                      onClick={this.handleOnRemoveMainPhoto}
                      onKeyDown={() => {}}
                      role="button"
                      tabIndex="0"
                    >
                      <div
                        styleName="imageBG"
                        style={{
                          backgroundImage: `url(${data.product.photoMain})`,
                        }}
                        alt="mainPhoto"
                      />
                      <div styleName="itemHover">
                        <Icon type="basket" size={40} />
                      </div>
                    </div>
                  )) || (
                    <div styleName="uploadItem">
                      <UploadWrapper
                        id="upload_photo"
                        onUpload={e => {
                          onUpload('photoMain', e);
                        }}
                        buttonHeight={10}
                        buttonWidth={10}
                        noIndents
                        buttonIconType="camera"
                        buttonIconSize={20}
                        buttonLabel="Add photo"
                        dataTest="productPhotosUploader"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div styleName="section">
              <div styleName="sectionName">Product photo gallery</div>
              <ProductsUploader
                onRemove={this.handleRemoveAddtionalPhoto}
                onUpload={onUpload}
                additionalPhotos={data.product.additionalPhotos}
              />
            </div>
            <div styleName="section">
              <div styleName="sectionName">General settings and pricing</div>
              <div styleName="categorySelector">
                <CategorySelector
                  categories={this.props.categories}
                  onSelect={id => this.props.onChange({ categoryId: id })}
                />
              </div>
              <div styleName="productStates formItem">
                <div styleName="productState">
                  <Input
                    id="price"
                    value={data.product.price || ''}
                    label="Price"
                    onChange={this.handleChangeProductState}
                    fullWidth
                    type="number"
                    postfix="STQ"
                  />
                </div>
                <div styleName="productState">
                  <Input
                    id="vendorCode"
                    value={data.product.vendorCode || ''}
                    label="Vendor code"
                    onChange={this.handleChangeProductState}
                    fullWidth
                  />
                  {/* <span styleName="">STQ</span> */}
                </div>
                <div styleName="productState">
                  <Input
                    id="cashback"
                    value={data.product.cashback || ''}
                    label="Cashback"
                    onChange={this.handleChangeProductState}
                    fullWidth
                    type="number"
                    postfix="%"
                  />
                  {/* <span styleName="">STQ</span> */}
                </div>
              </div>
            </div>
            {categoryId && this.renderAttributes()}
            <div styleName="buttons">
              <div>
                <Button
                  onClick={() => {
                    onSave();
                    onClose();
                  }}
                  dataTest="wizardSaveProductButton"
                  big
                  disabled={this.checkForSave()}
                >
                  <span>Save</span>
                </Button>
              </div>
              <div styleName="cancelButton">
                <Button
                  onClick={onClose}
                  dataTest="wizardCancelProductButton"
                  big
                  wireframe
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThirdForm;
