import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defineReactNode } from '@noodl/noodl-sdk';
import { useDockPanelContext, PanelContext } from '../contexts/DockPanelContext';
import { guid } from '../utils';

export default defineReactNode({
  name: 'dock-layout.dock-tab',
  displayName: "Dock Tab",
  category: 'Dock Layout',
  getReactComponent() {
    return function (props) {
      const panelContext = useDockPanelContext();
      const [id] = useState(guid());

      useEffect(() => {
        if (!panelContext?.updateTab) return;

        // console.log(props);

        panelContext.updateTab({
          id,
          title: String(props.title),
          component: props.component,
          closable: props.closable,
        });
      }, [panelContext, props]);

      return props.children;
    };
  },
  initialize() {},
  dynamicports: [],
  inputProps: {
    title: {
      displayName: "Title",
      type: "string",
      default: "Title",
      group: "Tab",
    },
    component: {
      displayName: "Component",
      type: "component",
      group: "Content",
    },
    closable: {
      displayName: "Closable",
      type: "boolean",
      default: false,
      group: "Tab",
    },
    // https://github.com/ticlo/rc-dock/blob/bec7ffff4df6390a05d214b8a848958e79e4d234/src/DockData.ts#L32
    // maximizable
  },
  outputProps: {}
});
