import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { CATEGORY_VISUAL, TYPE_MATERIAL } from '../../constants';

const SEPARATION = 50, AMOUNTX = 50, AMOUNTY = 50;
const numParticles = AMOUNTX * AMOUNTY;

export const testNode = Noodl.defineNode<{
    _internal: {
        mesh: THREE.Points;
        count: number;
    }
}>({
    name: 'Three.js Test',
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
        // @ts-expect-error
        this.updateMesh();

        this._internal.count = 0
    },
    methods: {
        setupScene(scene: THREE.Scene) {
            scene.add(this._internal.mesh);
        },
        destroyScene(scene: THREE.Scene) {
            scene.remove(this._internal.mesh);
        },
        updateMesh() {
            const positions = new Float32Array( numParticles * 3 );
            const scales = new Float32Array( numParticles );
    
            let i = 0, j = 0;
            for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
                for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
                    positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
                    positions[ i + 1 ] = 0; // y
                    positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
    
                    scales[ j ] = 1;
    
                    i += 3;
                    j ++;
                }
            }
    
            const buffer = new THREE.BufferGeometry();
            buffer.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            buffer.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
    
            const material = new THREE.PointsMaterial({
                size: 10,
                color: 0xff0000
            });
            
            const mesh = new THREE.Points(buffer, material);
    
            this._internal.mesh = mesh
        },
    },
    signals: {
        onRender() {
            // @ts-expect-error
            const count = this._internal.count

            // @ts-expect-error
            const positions = this._internal.mesh.geometry.attributes.position.array;
            // @ts-expect-error
            const scales = this._internal.mesh.geometry.attributes.scale.array;

            let i = 0, j = 0;
            for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
                for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
                    positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                    scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;

                    i += 3;
                    j ++;
                }
            }

            // @ts-expect-error
            this._internal.mesh.geometry.attributes.position.needsUpdate = true;
            // @ts-expect-error
            this._internal.mesh.geometry.attributes.scale.needsUpdate = true;
            // @ts-expect-error
            this._internal.count += 0.1;
        }
    }
});
