
enum ThreePropertyType {
    TRANSFORM
}
type DefineObjectDef<TState> = {
    state?: TState,
    initialize(): void;
    setupScene(scene: THREE.Scene): void;
    destroyScene(scene: THREE.Scene): void;
    changed: any;
    methods: any;
}
function defineObject<TState>(t: ThreePropertyType, def: DefineObjectDef<TState>) {}

defineObject<{
    mesh: THREE.Mesh,
}>(ThreePropertyType.TRANSFORM, {
    state: {
        mesh: null
    },
    initialize() {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
    },
    setupScene(scene: THREE.Scene): void {
        scene.add(this.mesh);
    },
    destroyScene(scene: THREE.Scene): void {
        scene.remove(this.mesh);
    },
    changed: {
        onTransform() {

        }
    },
    methods: {}
})
