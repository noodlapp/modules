import * as Noodl from '@noodl/noodl-sdk';

import { sceneNode } from './nodes/scene'
import { boxNode } from './nodes/gemoetry/box'
import { textNode } from './nodes/gemoetry/text'
import { meshNode, pointsNode, bufferGeometryNode } from './nodes/gemoetry/mesh'
import { canvasComponentNode } from './reactNodes/canvas'
import { meshBasicMaterialNode, meshNormalMaterialNode, meshPhongMaterialNode, meshPointsMaterialNode } from './nodes/materials/mesh-normal'
import { shaderMaterialMaterialNode } from './nodes/materials/custom-shader'
import { perspectiveNode } from './nodes/cameras/perspective'

import { testNode } from './nodes/gemoetry/test'

// module
Noodl.defineModule({
  reactNodes: [
    canvasComponentNode
  ],
  nodes: [
    sceneNode,
    boxNode,
    textNode,
    meshNode, pointsNode, bufferGeometryNode,
    meshBasicMaterialNode,
    meshNormalMaterialNode,
    meshPhongMaterialNode,
    meshPointsMaterialNode,
    shaderMaterialMaterialNode,
    perspectiveNode,

    testNode
  ],
  settings: [],
  setup() {
  }
});
