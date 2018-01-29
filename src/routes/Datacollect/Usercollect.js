import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import StandardTable from '../../components/StandardTable';
import DevicesTable from '../../components/DevicesTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Usercollect.less';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ datacollect, loading }) => ({
  datacollect,
  loading: loading.models.datacollect,
}))
@Form.create()

export default class Usercollect extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'datacollect/fetch',
    });
    dispatch({
      type: 'datacollect/fetchTypes',
    });
    dispatch({
      type: 'datacollect/fetchProtocols',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    message.error(JSON.stringify(params));

    dispatch({
      type: 'datacollect/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'datacollect/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'datacollect/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      message.error(JSON.stringify(values));
      dispatch({
        type: 'datacollect/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleCollect = () => {
    const { selectedRows } = this.state;
    this.props.dispatch(routerRedux.push({
      pathname: '/Dashboard/NewPage',
      state: { selectedRows, },
    }

    ));
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'datacollect/add',
      payload: {
        zdmc: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    //const { datacollect:{types}, loading } = this.props;
    //const wrapper = types.map(item  => <Option key={item.no}>{item.name}</Option>)
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="活动模式">
              {getFieldDecorator('hdms')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">主动</Option>
                  <Option value="1">被动</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    const { datacollect: { types, protocols }, loading } = this.props;
    const wrapper = types.map(item => <Option key={item.name}>{item.name}</Option>)
    const gy = protocols.map(item => <Option key={item.name}>{item.name}</Option>)

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="活动模式">
              {getFieldDecorator('hdms')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">主动</Option>
                  <Option value="1">被动</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="IP地址">
              {getFieldDecorator('ipdz')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规约类型">
              {getFieldDecorator('gylx')(
                <Select placeholder="请选择" style={{ width: '100%' }} >{gy}</Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="设备类型">
              {getFieldDecorator('sblx')(
                <Select placeholder="请选择" style={{ width: '100%' }} >{wrapper}</Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="IP端口">
              {getFieldDecorator('dk')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { datacollect: { data }, loading } = this.props;
    const { selectedRows, modalVisible, addInputValue } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="collect">批量召测</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button onClick={() => this.handleCollect()}>召测</Button>

                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <DevicesTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新建设备"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="设备名称"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={addInputValue} />
          </FormItem>
        </Modal>
      </div>
    );
  }
}
