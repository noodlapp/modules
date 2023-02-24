# Ideal Typescript Node
Prototype ideas... just rough ideas

## Version 1:
```ts
import * as Noodl from '@noodl/noodl-sdk'

interface State {
    children: Noodl.Node[];
}

interface Methods {
    addChildren(child: Noodl.Node, index: number): void;
    removeChild(child: Noodl.Node): void;
}

const node = Noodl.defineNode<State, Methods>({
    name: 'Ideal Typescript Component',
    color: 'visual',
    category: 'Visual',
    allowChildren: true,
    initialize: function () {
        this.state.children = []
    },
    methods: {
        addChild(child, index: number) {
            // NOTE: Parent have to the a visual component
            child.parent = this.parent;
            this.state.children.push(child);
        },
        // NOTE: removeChild will be called on the parent,
        //       therefor it's important to set the parent
        removeChild(child) {
            const index = this.state.children.indexOf(child);
            if (index !== -1) {
                this.state.children.splice(index, 1);
                child.parent = undefined;
            }
        },
    }
});

export const module = {
    node
}
```

## Version 2:
```ts
import * as Noodl from '@noodl/noodl-sdk'

interface State {
    children: Noodl.Node[];
}

interface Methods {
    addChildren(child: Noodl.Node, index: number): void;
    removeChild(child: Noodl.Node): void;
}

const node = Noodl.defineNode<State, Methods>({
    meta: {
        name: 'Ideal Typescript Component',
        color: 'visual',
        category: 'Visual',
        allowChildren: true,
    },
    setup() {
        this.state.children = []
    },
    methods: {
        addChild(child, index: number) {
            // NOTE: Parent have to the a visual component
            child.parent = this.parent;
            this.state.children.push(child);
        },
        // NOTE: removeChild will be called on the parent,
        //       therefor it's important to set the parent
        removeChild(child) {
            const index = this.state.children.indexOf(child);
            if (index !== -1) {
                this.state.children.splice(index, 1);
                child.parent = undefined;
            }
        },
    }
});

export const module = {
    node
}
```

## Version 3:
This requires some compile time actions...
```ts
import * as Noodl from '@noodl/noodl-sdk'

interface State {
    children: Noodl.Node[];
}

interface Methods {
    addChildren(child: Noodl.Node, index: number): void;
    removeChild(child: Noodl.Node): void;
}

interface Inputs {

}

interface Outputs {

}

const node = Noodl.defineNode<State, Methods, Inputs, Outputs>({
    meta: {
        name: 'Ideal Typescript Component',
        color: 'visual',
        category: 'Visual',
        allowChildren: true,
    },
    setup(inputs) {
        const addChild = function(child, index) {
            // NOTE: Parent have to the a visual component
            child.parent = this.parent;
            this.state.children.push(child);
        }

        const removeChild = function(child) {
            const index = this.state.children.indexOf(child);
            if (index !== -1) {
                this.state.children.splice(index, 1);
                child.parent = undefined;
            }
        }

        return {
            state: {
                children: []
            }
            methods: {
                addChild,
                removeChild
            }
        }
    }
});

export const module = {
    node
}
```
