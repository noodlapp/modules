import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { TYPE_MATERIAL } from '../../constants';

export const meshBasicMaterialNode = Noodl.defineNode({
    name: 'Three.js Mesh Basic Material',
    displayNodeName: 'Three.js Basic Material',
    color: 'data',
    outputs: {
        material: {
            displayName: 'Material',
            type: TYPE_MATERIAL
        }
    },
    initialize() {
        this.update();
    },
    methods: {
        update() {
            this.setOutputs({
                material: new THREE.MeshBasicMaterial({
                    color: 0x000
                })
            })
        }
    }
});

export const meshNormalMaterialNode = Noodl.defineNode({
    name: 'Three.js Mesh Normal Material',
    displayNodeName: 'Three.js Normal Material',
    color: 'data',
    inputs: {
        wireframe: {
            type: 'boolean',
            default: false
        },
        wireframeLinewidth: {
            type: 'number'
        },
        flatShading: {
            type: 'boolean'
        }
    },
    outputs: {
        material: {
            displayName: 'Material',
            type: TYPE_MATERIAL
        }
    },
    changed: {
        wireframe() { this.update() },
        wireframeLinewidth() { this.update() },
        flatShading() { this.update() },
    },
    initialize() {
        this.update();
    },
    methods: {
        update() {
            this.setOutputs({
                material: new THREE.MeshNormalMaterial({
                    wireframe: Boolean(this.inputs.wireframe),
                    wireframeLinewidth: Number(this.inputs.wireframeLinewidth),
                    flatShading: Boolean(this.inputs.flatShading)
                })
            })
        }
    }
});

export const meshPhongMaterialNode = Noodl.defineNode({
    name: 'Three.js Mesh Phong Material',
    displayNodeName: 'Three.js Phong Material',
    color: 'data',
    outputs: {
        material: {
            displayName: 'Material',
            type: TYPE_MATERIAL
        }
    },
    initialize() {
        this.update();
    },
    methods: {
        update() {
            this.setOutputs({
                material: new THREE.MeshPhongMaterial({
                    color: 0xf08000,
                    side: THREE.DoubleSide
                })
            })
        }
    }
});

export const meshPointsMaterialNode = Noodl.defineNode({
    name: 'Three.js Points Material',
    displayNodeName: 'Three.js Points Material',
    color: 'data',
    outputs: {
        material: {
            displayName: 'Material',
            type: TYPE_MATERIAL
        }
    },
    initialize() {
        this.update();
    },
    methods: {
        update() {
            this.setOutputs({
                material: new THREE.PointsMaterial({
                    size: 8,
                    sizeAttenuation: false,
                    color: 0xf08000 
                })
            })
        }
    }
});
