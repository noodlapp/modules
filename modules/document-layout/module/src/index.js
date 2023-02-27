import { defineModule } from '@noodl/noodl-sdk';

import DockBox from './nodes/DockBox';
import DockLayout from './nodes/DockLayout';
import DockPanel from './nodes/DockPanel';
import DockTab from './nodes/DockTab';
import DockFloatPanel from './nodes/DockFloatPanel';

Noodl.defineModule({
  reactNodes: [
    DockBox,
    DockLayout,
    DockPanel,
    DockFloatPanel,
    DockTab,
  ],
  nodes: [],
  settings: [],
  setup() {

  }
});
