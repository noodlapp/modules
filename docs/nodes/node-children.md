# Node with children

```ts
import * as Noodl from '@noodl/noodl-sdk'

const node = Noodl.defineNode({
    name: 'Component With Children',
    color: 'visual',
    category: 'Visual',
    allowChildren: true,
    initialize: function () {
        this._internal.children = []
    },
    methods: {
        addChild(child, index: number) {
            // NOTE: Parent have to the a visual component
            child.parent = this.parent;
            this._internal.children.push(child);
        },
        // NOTE: removeChild will be called on the parent,
        //       therefor it's important to set the parent
        removeChild(child) {
            const index = this._internal.children.indexOf(child);
            if (index !== -1) {
                this._internal.children.splice(index, 1);
                child.parent = undefined;
            }
        },
    }
});

export const module = {
    node
}
```
