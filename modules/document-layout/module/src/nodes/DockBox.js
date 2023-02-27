import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defineReactNode } from '@noodl/noodl-sdk';
import { useDockContext } from '../contexts/DockContext';
import { PanelContext } from '../contexts/DockPanelContext';
import { guid, traverse } from '../utils';

export default defineReactNode({
  name: 'dock-layout.dock-box',
  displayName: "Dock Box",
  category: 'Dock Layout',
  getReactComponent() {
    return function (props) {
      const context = useDockContext();
      const [id] = useState(guid());
      const [_, reload] = useState(0);

      useEffect(() => {
        context.setLayout((layout) => {
          const newLayout = JSON.parse(JSON.stringify(layout));

          const updated = traverse(
            newLayout,
            id,
            (child, parent) => {
              child.mode = props.mode;
              child.size = props.size;
              child.minWidth = props.minWidth;
              child.minHeight = props.minHeight;
              child.widthFlex = props.widthFlex;
              child.heightFlex = props.heightFlex;
            }
          )

          if (updated) {
            return newLayout;
          }

          return layout;
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

                    const index = child.tabs.findIndex((x) => x.id === newTab.tabs[0].id)
                    if (index === -1) {
                      child.tabs.push(newTab.tabs[0])
                    }
                    // if (newTab.tabs[0].title === "Tab 2") debugger
                  }
                )

                // Add the initial tab to this panel
                if (!updated) {
                  const updated2 = traverse(
                    newLayout,
                    id,
                    (child, parent) => {
                      const tab = child.children.find((x) => x.id === newTab.id);
                      if (!tab) {
                        child.children.push(newTab);
                      }
                    }
                  )

                  if (!updated2) {
                    newLayout.dockbox.children.push({
                      id,
                      mode: props.mode,
                      children: [newTab]
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
    mode: {
      displayName: 'Mode',
      type: {
        name: "enum",
        enums: [
          {
            label: "Horizontal",
            value: "horizontal"
          },
          {
            label: "Vertical",
            value: "vertical"
          },
          {
            label: "Float",
            value: "float"
          },
          {
            label: "Window",
            value: "window"
          },
          {
            label: "Maximize",
            value: "maximize"
          }
        ]
      },
      group: "Layout",
      default: 'horizontal'
    },
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
  },
  outputProps: {}
});
