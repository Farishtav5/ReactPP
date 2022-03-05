import React, { Component } from "react";
import TableHome from "../TableHome/TableHome";
import ProviderDetails from '../ProviderDetails/ProviderDetails';
// import { addTab } from "./../../store/broadcaster/BroadcastRegister";
import { Tabs } from "antd";
import "./TabNew.css";
const { TabPane } = Tabs;

export default class TabNew extends Component {
  subscribe;
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Claim Search', content: <TableHome />, key: '1', closable: false},
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
    // this.subscribe = addTab.subscribe(tabInfo => {this.add(tabInfo)})
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  
  // add = (tabDetails) => {
  //   const { panes } = this.state;
  //   const activeKey = `newTab${this.newTabIndex++}`;
  //   switch(tabDetails.type) {  
  //     case 'episodeDetails' :
  //       panes.push({ title: 'NPI:     '+tabDetails.id, content: <ProviderDetails id={tabDetails.id}/>, key: activeKey }); 
  //       break    
  //     default:
  //       console.error("wrong page info");
  //   }
  //   this.setState({ panes, activeKey });
  // };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };


  render() {
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
