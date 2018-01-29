import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
class DevicesTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10);
    }, 0);

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, totalCallNo });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys, totalCallNo } = this.state;
    const { data: { list, pagination }, loading } = this.props;
    const status = ['被动', '主动', '已上线', '异常'];

    const columns = [
      {
        title: '编号',
        dataIndex: 'no',
      },
      {
        title: '行政区划',
        dataIndex: 'xzqh',
      },
      {
        title: '终端名称',
        dataIndex: 'zdmc',
      },
      {
        title: '终端地址',
        dataIndex: 'zddz',
      },
      {
        title: '终端设备类型',
        dataIndex: 'sblx',
      },
      {
        title: '功能用途',
        dataIndex: 'gnyt',
      },
      {
        title: '规约类型',
        dataIndex: 'gylx',
      },
      {
        title: 'IP地址',
        dataIndex: 'ipdz',
      },
      {
        title: '端口',
        dataIndex: 'dk',
      },
      {
        title: '活动模式',
        dataIndex: 'hdms',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          }, 
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '业务编码',
        dataIndex: 'ywbm',
      },
      {
        title: '生产编码',
        dataIndex: 'scbm',
      },
      {
        title: '资产编号',
        dataIndex: 'zcbh',
      }, 
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default DevicesTable;