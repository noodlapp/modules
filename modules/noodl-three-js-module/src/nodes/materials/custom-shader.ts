import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { TYPE_MATERIAL } from '../../constants';

const defaultVertexShader = `
void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`

const defaultFragmentShader = `
uniform vec3 color;

void main() {
    gl_FragColor = vec4(color, 1.0);
}
`

export const shaderMaterialMaterialNode = Noodl.defineNode<{
    _internal: {
        material: THREE.ShaderMaterial
    }
}>({
    name: 'Three.js Shader Material',
    displayNodeName: 'Three.js Shader Material',
    color: 'data',
    inputs: {
        vertexShader: {
            displayName: 'Vertex Shader',
            type: {
                name: "string",
                allowEditOnly: true,
                codeeditor: "javascript"
            }
        },
        fragmentShader: {
            displayName: 'Fragment Shader',
            type: {
                name: "string",
                allowEditOnly: true,
                codeeditor: "javascript"
            }
        }
    },
    outputs: {
        material: {
            displayName: 'Material',
            type: TYPE_MATERIAL
        }
    },
    changed: {
        // @ts-expect-error
        vertexShader() { this.updateShader(); },
        // @ts-expect-error
        fragmentShader() { this.updateShader(); },
    },
    initialize() {
        // @ts-expect-error
        this.updateShader();
    },
    methods: {
        updateShader() {
            this._internal.material?.dispose()

            const vertexShader = this.inputs.vertexShader ?? defaultVertexShader
            const fragmentShader = this.inputs.fragmentShader ?? defaultFragmentShader

            const material = this._internal.material = new THREE.ShaderMaterial({
                uniforms: {
                    color: { value: new THREE.Color( 0x000000 ) },
                },
                vertexShader,
                fragmentShader
            })

            this.setOutputs({ material })
        }
    }
});
