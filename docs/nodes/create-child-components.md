# Create Child Components
This is how the "Repeater" / "Foreach" works.

> This is a little complicated,
> this should really be done with React nodes instead.

```ts
import * as Noodl from '@noodl/noodl-sdk'

const node = Noodl.defineNode({
    name: 'Component with custom child nodes',
    color: 'visual',
    category: 'Visual',
    inputs: {
        component: {
            group: 'Dynamic',
            displayName: 'Component',
            type: 'component'
        }
    },
    initialize: function () {
        // FIXME: Due to not having access to Node.prototype.setNodeModel
        const n = this.setNodeModel;
        this.setNodeModel = (...args) => {
            n.call(this, ...args);
            this._setNodeModel.call(this, ...args);
        }
    },
    methods: {
        updateTarget: function (targetId) {
            this._internal.target = targetId ? this.nodeScope.getNodeWithId(targetId) : undefined;
            this.scheduleRefresh();
        },
        _setNodeModel: function (nodeModel) {
            // TODO: This have to be imported
            // Node.prototype.setNodeModel.call(this, nodeModel);
            
            if (nodeModel.parent) {
                this.updateTarget(nodeModel.parent.id);
            }
            var self = this;
            // @ts-expect-error
            nodeModel.on("parentUpdated", function (newParent) {
                self.updateTarget(newParent ? newParent.id : undefined);
            }, this);
        },
        scheduleRefresh: function () {
            var _this = this;
            var internal = this._internal;
            if (!internal.hasScheduledRefresh) {
                internal.hasScheduledRefresh = true;
                this.scheduleAfterInputsHaveUpdated(function () {
                    _this.refresh();
                });
            }
        },
        _deleteDynamicNode: function () {
            if (!this._internal.node) return;

            const item = this._internal.node

            item.model && item.model.removeListenersWithRef(this);
            item.componentModel && item.componentModel.removeListenersWithRef(this);

            const parent = item.parent;
            if (item._deleted || !parent) return;

            parent.removeChild(item);
            parent.nodeScope.deleteNode(item);

            this._internal.node = null;
        },

        async refresh() {
            const internal = this._internal;
            internal.hasScheduledRefresh = false;

            this._deleteDynamicNode();

            //check if we have a target to add nodes to
            if (!internal.target) return;

            const component: string = this.inputs.component
            if (component) {
                const node = await this.nodeScope.createNode(
                    component,
                    undefined
                );
    
                this._internal.node = node
    
                this.parent.addChild(node)
            } else {
                for (const child of this._internal.children) {
                    // @ts-expect-error
                    child.parent = this.parent;
                }
            }
        },
        
        // NOTE: render is required since it has children
        render() { }
    }
});

export const module = {
    node
}
```
