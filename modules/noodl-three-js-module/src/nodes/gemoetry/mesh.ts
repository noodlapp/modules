import * as Noodl from '@noodl/noodl-sdk';
import * as THREE from 'three';
import { CATEGORY_GEOMETRY, CATEGORY_VISUAL, TYPE_GEMOETRY, TYPE_MATERIAL } from '../../constants';

export const meshNode = Noodl.defineNode<{
    _internal: {
        mesh: THREE.Mesh
    }
}>({
    name: 'Three.js Mesh',
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

        geometry: {
            displayName: 'Geometry',
            type: TYPE_GEMOETRY
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

        geometry() {
            this._internal.mesh.geometry = this.inputs.geometry
        },

        material() {
            this._internal.mesh.material = this.inputs.material
        }
    },
    initialize() {
        // @ts-expect-error
        this.updateMesh();
    },
    methods: {
        setupScene(scene: THREE.Scene) {
            scene.add(this._internal.mesh);
        },
        destroyScene(scene: THREE.Scene) {
            scene.remove(this._internal.mesh);
        },
        updateMesh() {
            const geometry = this.inputs.geometry ?? new THREE.BoxGeometry(1, 1, 1);
            const material = this.inputs.material ?? new THREE.MeshNormalMaterial();
    
            this._internal.mesh = new THREE.Mesh(geometry, material);
        }
    }
});

export const pointsNode = Noodl.defineNode<{
    _internal: {
        mesh: THREE.Points
    }
}>({
    name: 'Three.js Points',
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

        geometry: {
            displayName: 'Geometry',
            type: TYPE_GEMOETRY
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

        geometry() {
            // @ts-expect-error
            this.updateMesh();
        },

        material() {
            // @ts-expect-error
            this.updateMesh();
        }
    },
    initialize() {
        // @ts-expect-error
        this.updateMesh();
    },
    methods: {
        setupScene(scene: THREE.Scene) {
            scene.add(this._internal.mesh);
        },
        destroyScene(scene: THREE.Scene) {
            scene.remove(this._internal.mesh);
        },
        updateMesh() {
            const geometry = this.inputs.geometry ?? new THREE.BoxGeometry(1, 1, 1);
            const material = this.inputs.material ?? new THREE.PointsMaterial();
    
            this._internal.mesh = new THREE.Points(geometry, material);
        }
    }
});

export const bufferGeometryNode = Noodl.defineNode<{
    _internal: {
        buffer: THREE.BufferGeometry
    }
}>({
    name: 'Three.js Buffer Geometry',
    color: 'data',
    category: CATEGORY_GEOMETRY,
    inputs: {

    },
    outputs: {
        geometryBuffer: {
            displayName: 'Geometry Buffer',
            type: TYPE_GEMOETRY
        }
    },
    initialize() {
        const SEPARATION = 50, AMOUNTX = 50, AMOUNTY = 50;
        const numParticles = AMOUNTX * AMOUNTY;

        const positions = new Float32Array( numParticles * 3 );
        const scales = new Float32Array( numParticles );

        let i = 0, j = 0;
        for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
                positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
                positions[ i + 1 ] = 0; // y
                positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

                scales[ j ] = 10;

                i += 3;
                j ++;
            }
        }

        this._internal.buffer = new THREE.BufferGeometry();
        this._internal.buffer.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        this._internal.buffer.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        this.setOutputs({
            geometryBuffer: this._internal.buffer
        })
    }
});
