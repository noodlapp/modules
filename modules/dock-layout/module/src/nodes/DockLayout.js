import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { defineReactNode } from '@noodl/noodl-sdk';
import { Context } from '../contexts/DockContext';

import DockLayout from 'rc-dock';
// import 'rc-dock/dist/rc-dock.css';
import 'rc-dock/dist/rc-dock-dark.css';

const defaultLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [],
  },
  floatbox: {
    mode: 'float',
    children: [],
  },
  maxbox: {
    mode: "maximize",
    children: [],
  },
  windowbox: {
    mode: "window",
    children: [],
  },
}

function DockLayoutComponent(props) {
  const [layout, setLayout] = useState(defaultLayout);

  const [panels, setPanels] = useState({});

  useEffect(() => {
    setLayout((layout) => JSON.parse(JSON.stringify(layout)));
  }, [panels]);

  function loadTab(data) {
    let { id, component } = data;
    
    // Create the node
    if (!panels[id] && component) {
      (async () => {
        const noodlNode = await props.noodlNode.nodeScope.createNode(
          component,
          undefined,
          {}
        );

        // Check to avoid logging: "node doesn't have input id"
        if (noodlNode.getInput("id")) {
          noodlNode.setInputValue("id", id);
        }
        noodlNode.popupParent = props.noodlNode;

        setPanels((prev) => {
          if (prev[id]) {
            prev[id].noodlNode._onNodeDeleted();
            delete prev[id];
          }

          prev[id] = {
            noodlNode,
            content: noodlNode.render()
          };
          return { ...prev };
        });
      })();
    }

    // Return the already created node
    if (panels[id]) {
      const noodlNode = panels[id];
      return {
        ...data,
        content: noodlNode.content
      }
    }

    return {
      id,
      title: id,
      content: <div>Tab Content</div>,
      ...data
    };
  }

  function updateLayout(func) {
    setLayout((layout) => {
      const newLayout = func(layout);
      const changed = JSON.stringify(layout) !== JSON.stringify(newLayout);
      // console.log('updateLayout', changed);
      return changed ? newLayout : layout;
    });
  }

  function onLayoutChange(newLayout, currentTabId, direction) {
    setLayout(newLayout);
    props.outLayout(newLayout);
    props.outOnLayoutChanged();
  }

  return (
    <Context.Provider
      value={{
        layout,
        setLayout: updateLayout,
      }}
    >
      <>
        <DockLayout
          layout={layout}
          loadTab={loadTab}
          onLayoutChange={onLayoutChange}
          style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
        />

        {props.children}
      </>
    </Context.Provider>
  );
}

export default defineReactNode({
  name: 'dock-layout.dock-layout',
  displayName: 'Dock Layout',
  category: 'Dock Layout',
  // TODO: Not allowed by SDK
  // noodlNodeAsProp: true,
  // useVariants: false,
  getReactComponent() {
    return DockLayoutComponent;
  },
  initialize() {
    this.props.noodlNode = this;
  },
  dynamicports: [],
  inputProps: {},
  outputProps: {
    outLayout: {
      displayName: "Layout",
      type: "object",
      group: "Data"
    },
    outOnLayoutChanged: {
      displayName: "Layout Changed",
      type: "signal",
      group: "Events"
    },
  }
});
