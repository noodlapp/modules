import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defineReactNode } from '@noodl/noodl-sdk';
import { useDockContext } from '../contexts/DockContext';
import { PanelContext } from '../contexts/DockPanelContext';
import { guid, traverse } from '../utils';

export default defineReactNode({
  name: 'dock-layout.dock-float-panel',
  displayName: "Dock Float Panel",
  category: 'Dock Layout',
  getReactComponent() {
    return function (props) {
      const context = useDockContext();
      const [id] = useState(guid());
      const [_, reload] = useState(0);

      useEffect(() => {
        context.setLayout((layout) => {
          const panel = layout.floatbox.children.find((x) => x.id === id);
          if (panel) {
            panel.x = props.x;
            panel.y = props.y;
            panel.w = props.w;
            panel.h = props.h;
          } else {
            layout.floatbox.children.push({
              id,
              tabs: [],
              x: props.x,
              y: props.y,
              w: props.w,
              h: props.h,
            });

            reload((p) => p + 1);
          }
          return { ...layout };
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
                  }
                )

                // Add the initial tab to this panel
                if (!updated) {
                  const panel = newLayout.floatbox.children.find((x) => x.id === id);
                  if (panel) panel.tabs.push(newTab);
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
    x: {
      displayName: "X",
      type: "number",
      default: 0,
    },
    y: {
      displayName: "Y",
      type: "number",
      default: 0,
    },
    w: {
      displayName: "Width",
      type: "number",
      default: 400,
    },
    h: {
      displayName: "Height",
      type: "number",
      default: 300,
    },
  },
  outputProps: {}
})
