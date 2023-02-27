import { defineModule } from '@noodl/noodl-sdk';

import Area from './nodes/turfArea';
import Center from './nodes/turfCenter';
import CenterOfMass from './nodes/turfCenterOfMass';

Noodl.defineModule({
  reactNodes: [],
  nodes: [
    Area,
    Center,
    CenterOfMass,
  ],
  settings: [],
  setup() {}
});
