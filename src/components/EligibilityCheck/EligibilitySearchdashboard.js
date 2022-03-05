import React, { Component } from "react";
import EligibilityCheck from "./EligibilityCheck";
import MemberDetail from "../memberSearch/memberDetails";
import { addTab } from "./../../store/broadcaster/BroadcastRegister";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const fromWhere = "Check Eligibility";

export default class Searchdashboard extends Component {
  subscribe;
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    // this.state = {
    //   fromWhere: "Check Eligibility",
    // };
    const panes = [
      {
        title: "Eligibility Check",
        content: <EligibilityCheck />,
        key: "1",
        closable: false,
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
    this.subscribe = addTab.subscribe((tabInfo) => {
      if (tabInfo === null) return;
      else this.add(tabInfo);
    });
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  //test

  add = (tabDetails) => {
    if (tabDetails.item != undefined) {
      const { panes } = this.state;
      let activeKey;
      const currentIndex = panes.findIndex((pane) =>
        pane.title.includes(tabDetails.item.SubscriberID)
      );
      if (currentIndex === -1) {
        activeKey = `newTab${this.newTabIndex++}`;
        switch (tabDetails.type) {
          case "membertype":
            panes.push({
              title: "SID: " + tabDetails.item.SubscriberID,
              content: (
                <MemberDetail data={tabDetails.item} fromPage={fromWhere} />
              ),
              key: activeKey,
            });
            break;
          // console.error("Invalid Episode Id");
        }
      } else {
        activeKey = panes[currentIndex].key;
      }
      this.setState({ panes, activeKey });
    }
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
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
