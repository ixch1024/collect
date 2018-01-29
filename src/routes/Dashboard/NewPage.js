import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Tree,
} from 'antd';
import { routerRedux } from 'dva/router';

const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

@connect(({ newpage, loading }) => ({
  newpage,
  loading: loading.models.newpage,
}))


export default class newpage extends PureComponent {

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.cld) {
        return (
          <TreeNode title={item.zdmc} key={item.no} dataRef={item}>
            {this.renderTreeNodes(item.cld)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} dataRef={item}></TreeNode>;
    });
  }

  render() {
    const { location, loading } = this.props;
    const { dispatch } = this.props;

    let treeData = [{ title: '测试', key: 'aaa' }];
    if (location.state) {
      treeData = location.state.selectedRows;
    }
    else {
      dispatch(routerRedux.push('/Datacollect/Usercollect'));
    }

    return (
      <div>
        <Row gutter={24}>
        <Card loading={loading} bordered={false} title="规约参数项">
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            
              <Tree checkable>
                {this.renderTreeNodes(treeData)}
              </Tree>

          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          
              <Tabs defaultActiveKey="2">
                <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                  Tab 1
                </TabPane>
                <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                  Tab 2
                </TabPane>
              </Tabs>
          
          </Col>
          </Card>
        </Row>
      </div>
    );
  }
}