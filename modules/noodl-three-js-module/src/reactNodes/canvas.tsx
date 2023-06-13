import * as Noodl from '@noodl/noodl-sdk';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { CATEGORY_CAMERA, TYPE_SCENE } from '../constants';

type ThreeJsCanvasProps = {
    alpha: boolean;
    antialias: boolean;
    scene: any;
}

function canvasComponent({
    alpha,
    antialias,
    scene,
}: ThreeJsCanvasProps): JSX.Element {
    const element = useRef<HTMLDivElement>(null);
    // @ts-expect-error
    const [resizeObserver, setResizeObserver] = useState<ResizeObserver>(null);
    const [mainScene, setMainScene] = useState<THREE.Scene>(null);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>(null);
    const [camera, setCamera] = useState<THREE.Camera>(null);

    function getSize() {
        // @ts-expect-error
        const width = Math.max(10, element.current.offsetWidth);
        // @ts-expect-error
        const height = Math.max(10, element.current.offsetHeight);

        return {
            width,
            height,
            aspectRatio: width / height
        }
    }

    const styleObject = {
        width: '100%',
        height: '100%',
        zIndex: '10'
    };

    // Handle new scenes and deleting old ones
    useEffect(() => {
        if (scene) {
            setMainScene(scene);
        } else {
            mainScene?.clear();
            setMainScene(null);
            renderer?.setAnimationLoop(null);
        }
    }, [scene, renderer]);

    useEffect(() => {
        if (mainScene) {
            renderer.setAnimationLoop((time: number) => {
                if (mainScene) {
                    renderer.render(mainScene, camera);
                }
            });
        } else {
            renderer?.setAnimationLoop(null);
        }
    }, [mainScene]);
    
    // Create Renderer
    useLayoutEffect(() => {
        // Listen for any resizes
        if (!resizeObserver) {
            setResizeObserver((function () {
                // @ts-expect-error
                const resizeObserver = new ResizeObserver(() => {
                    if (renderer) {
                        const { width, height, aspectRatio } = getSize()
                        renderer.setSize(width, height);
                        camera.aspect = aspectRatio;
                        camera.updateProjectionMatrix();
                    }
                })
                resizeObserver.observe(element.current);
                return resizeObserver;
            })());
        }

        // Create a Camera
        const { width, height, aspectRatio } = getSize()
        const camera = new THREE.PerspectiveCamera( 70, aspectRatio, 0.01, 10000 );
        camera.position.z = 1000;

        const light = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add(light);

        setCamera(camera);

        // Create Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha,
            antialias,
        });
        
        // @ts-expect-error
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height);
        // @ts-expect-error
        element.current.appendChild(renderer.domElement);

        setRenderer(renderer);

    }, []);

    return (
        <div ref={element} style={styleObject}></div>
    )
}

export const canvasComponentNode = Noodl.defineReactNode({
    name: 'Three.js Canvas',
    category: 'Thress.js',
    // TODO: React component always seems to want to render the children, is there a way to stop that?
    allowChildren: false,
    // TODO: allowChildrenWithCategory is ignored when React component
    allowChildrenWithCategory: [CATEGORY_CAMERA],
    getReactComponent: () => canvasComponent,
    inputProps: {
        alpha: {
            displayName: 'Alpha',
            type: 'boolean',
            default: true,
            group: 'Display'
        },
        antialias: {
            displayName: 'Anti Alias',
            type: 'boolean',
            default: true,
            group: 'Display'
        },
        scene: {
            displayName: 'Scene',
            type: TYPE_SCENE,
            group: 'Rendering'
        }
    },
    outputProps: {},
    inputs: {},
    outputs: {}
});
