import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { CATEGORY_VISUAL, TYPE_SCENE } from '../constants';

export const sceneNode = Noodl.defineNode<{
    _internal: {
        scene: THREE.Scene;
        children: unknown[];
    }
}>({
    name: 'Three.js Scene',
    color: 'data',
    category: CATEGORY_VISUAL,
    allowChildren: true,
    allowChildrenWithCategory: [CATEGORY_VISUAL],
    outputs: {
        thisScene: {
            type: TYPE_SCENE,
            displayName: 'This Scene'
        }
    },
    initialize() {
        this._internal.scene = new THREE.Scene();
        this._internal.children = []
        
        this.setOutputs({
            thisScene: this._internal.scene
        });

        // We want to remove 'multiple-visual-roots-warning' for now.
        // But lets just do all of them.
        this.clearWarnings();
    },
    methods: {
        addChild(child, index: number) {
            
            if (!child.setupScene) {
                child.sendWarning('three-node-warning', 'Invalid Node.')
            } else {
                child.setupScene(this._internal.scene)
            }

            child.parent = this;
            this._internal.children.push(child);
        },
        removeChild(child) {
            if (!child.destroyScene) {
                child.sendWarning('three-node-warning', 'Invalid Node.')
            } else {
                child.destroyScene(this._internal.scene)
            }

            const index = this._internal.children.indexOf(child);
            if (index !== -1) {
                this._internal.children.splice(index, 1);
                child.parent = undefined;
            }
        },
        getChildren() {
            return this._internal.children;
        },
    }
});
