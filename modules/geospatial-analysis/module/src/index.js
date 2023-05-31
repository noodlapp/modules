import { defineModule } from '@noodl/noodl-sdk';

import Api from './nodes/api';
import Area from './nodes/turfArea';
import Center from './nodes/turfCenter';
import CenterOfMass from './nodes/turfCenterOfMass';

defineModule({
  reactNodes: [],
  nodes: [
    Api,
    Area,
    Center,
    CenterOfMass,
  ],
  settings: [],
  setup() {}
});
