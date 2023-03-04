import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defineReactNode } from '@noodl/noodl-sdk';
import { useDockContext } from '../contexts/DockContext';
import { PanelContext } from '../contexts/DockPanelContext';
import { useDockPanelContext } from '../contexts/DockPanelContext';
import { guid, traverse } from '../utils';

export default defineReactNode({
  name: 'dock-layout.dock-panel',
  displayName: "Dock Panel",
  category: 'Dock Layout',
  getReactComponent() {
    return function (props) {
      const context = useDockContext();
      const panelContext = useDockPanelContext();
      const [id] = useState(guid());
      const [_, reload] = useState(0);

      useEffect(() => {
        context.setLayout((layout) => {
          const newLayout = JSON.parse(JSON.stringify(layout));

          const updated = traverse(
            newLayout,
            id,
            (child, parent) => {
              child.size = props.size;
              if (!child.panelLock) {
                child.panelLock = {}
              }
              child.panelLock.panelStyle = props.panelStyle;
              child.panelLock.minWidth = props.minWidth;
              child.panelLock.minHeight = props.minHeight;
              child.panelLock.widthFlex = props.widthFlex;
              child.panelLock.heightFlex = props.heightFlex;
            }
          )

          return newLayout;
        });
      }, [props]);

      return (
        <PanelContext.Provider
          value={{
            updateTab(newTab) {
              if (!newTab) return;

              context.setLayout((layout) => {
                const newLayout = JSON.parse(JSON.stringify(layout));

                // Update, wherever the tab is.
                const updated = traverse(
                  newLayout,
                  newTab.id,
                  (child, parent) => {
                    child.title = newTab.title;
                    child.component = newTab.component;
                    child.closable = newTab.closable;
                  }
                )

                // Add the initial tab to this panel
                if (!updated) {
                  if (panelContext.updateTab) {
                    panelContext.updateTab({
                      id,
                      tabs: [newTab],
                    })
                  } else {
                    newLayout.dockbox.children.push({
                      id,
                      tabs: [newTab],
                    })
                  }
                }
                
                return newLayout;
              });
            }
          }}
        >
          {props.children}
        </PanelContext.Provider>
      );
    };
  },
  initialize() {},
  dynamicports: [],
  inputProps: {
    size: {
      displayName: "Size",
      type: "number",
      group: "Dimensions",
      default: 200
    },
    minWidth: {
      displayName: "Min Width",
      type: "number",
      group: "Dimensions",
      default: undefined
    },
    minHeight: {
      displayName: "Min Height",
      type: "number",
      group: "Dimensions",
      default: undefined
    },
    widthFlex: {
      displayName: "Width Flex",
      type: "number",
      group: "Dimensions",
      default: undefined
    },
    heightFlex: {
      displayName: "Height Flex",
      type: "number",
      group: "Dimensions",
      default: undefined
    },
    panelStyle: {
      displayName: "Panel Style",
      type: "string",
      group: "Style",
      default: undefined
    },
  },
  outputProps: {}
})
