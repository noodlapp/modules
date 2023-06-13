import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { CATEGORY_VISUAL, TYPE_MATERIAL } from '../../constants';

export const boxNode = Noodl.defineNode<{
    _internal: {
        mesh: THREE.Mesh
    }
}>({
    name: 'Three.js Box',
    color: 'data',
    category: CATEGORY_VISUAL,
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
            type: TYPE_MATERIAL
        }
    },
    changed: {
        positionX() { this._internal.mesh.position.x = this.inputs.positionX }, 
        positionY() { this._internal.mesh.position.y = this.inputs.positionY }, 
        positionZ() { this._internal.mesh.position.z = this.inputs.positionZ }, 

        rotationX() { this._internal.mesh.rotation.x = this.inputs.rotationX }, 
        rotationY() { this._internal.mesh.rotation.y = this.inputs.rotationY },
        rotationZ() { this._internal.mesh.rotation.z = this.inputs.rotationZ },

        scaleX() { this._internal.mesh.scale.x = this.inputs.scaleX }, 
        scaleY() { this._internal.mesh.scale.y = this.inputs.scaleY },
        scaleZ() { this._internal.mesh.scale.z = this.inputs.scaleZ },

        material() {
            this._internal.mesh.material = this.inputs.material
        }
    },
    initialize() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const defaultMaterial = new THREE.MeshNormalMaterial();
        
        const mesh = new THREE.Mesh(geometry, defaultMaterial);

        this._internal.mesh = mesh
    },
    methods: {
        setupScene(scene: THREE.Scene) {
            scene.add(this._internal.mesh);
        },
        destroyScene(scene: THREE.Scene) {
            scene.remove(this._internal.mesh);
        }
    }
});
