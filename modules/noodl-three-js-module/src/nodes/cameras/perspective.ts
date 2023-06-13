import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';

export const perspectiveNode = Noodl.defineNode({
    name: 'Three.js Perspective Camera',
    color: 'data',
    category: 'Visual',
    inputs: {
        positionX: {
            displayName: 'Position X',
            type: 'number',
            default: 0,
            group: 'Transform'
        },
        positionY: {
            displayName: 'Position Y',
            type: 'number',
            default: 0,
            group: 'Transform'
        },
        positionZ: {
            displayName: 'Position Z',
            type: 'number',
            default: 0,
            group: 'Transform'
        },

        rotationX: {
            displayName: 'Rotation X',
            type: 'number',
            default: 0,
            group: 'Transform'
        },
        rotationY: {
            displayName: 'Rotation Y',
            type: 'number',
            default: 0,
            group: 'Transform'
        },
        rotationZ: {
            displayName: 'Rotation Z',
            type: 'number',
            default: 0,
            group: 'Transform'
        },

        scaleX: {
            displayName: 'Scale X',
            type: 'number',
            default: 1,
            group: 'Transform'
        },
        scaleY: {
            displayName: 'Scale Y',
            type: 'number',
            default: 1,
            group: 'Transform'
        },
        scaleZ: {
            displayName: 'Scale Z',
            type: 'number',
            default: 1,
            group: 'Transform'
        },

        material: {
            displayName: 'Material',
            type: '*'
        }
    },
    changed: {
        // @ts-expect-error
        positionX() { this._internal.mesh.position.x = this.inputs.positionX }, 
        // @ts-expect-error
        positionY() { this._internal.mesh.position.y = this.inputs.positionY }, 
        // @ts-expect-error
        positionZ() { this._internal.mesh.position.z = this.inputs.positionZ }, 

        // @ts-expect-error
        rotationX() { this._internal.mesh.rotation.x = this.inputs.rotationX }, 
        // @ts-expect-error
        rotationY() { this._internal.mesh.rotation.y = this.inputs.rotationY },
        // @ts-expect-error
        rotationZ() { this._internal.mesh.rotation.z = this.inputs.rotationZ },

        // @ts-expect-error
        scaleX() { this._internal.mesh.scale.x = this.inputs.scaleX }, 
        // @ts-expect-error
        scaleY() { this._internal.mesh.scale.y = this.inputs.scaleY },
        // @ts-expect-error
        scaleZ() { this._internal.mesh.scale.z = this.inputs.scaleZ },

        material() {
            // @ts-expect-error
            this._internal.mesh.material = this.inputs.material
        }
    },
    initialize() {
        const camera = new THREE.PerspectiveCamera();

        // @ts-expect-error
        this._internal.camera = camera
    },
});
