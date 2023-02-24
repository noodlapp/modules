import * as Noodl from '@noodl/noodl-sdk'

const dynamicComponent = Noodl.defineNode<{
    // Dummy
    parent: any;

    // Variables
    _internal: {
        children: Noodl.NodeInstance[];
        target: Noodl.NodeInstance;
        hasScheduledRefresh: boolean;
        node: any;
    },

    // Methods
    updateTarget: (targetId: string) => void;
    _setNodeModel: (...args: any) => void;
    scheduleRefresh: () => void;
    _deleteDynamicNode: () => void;

    addChild: (child: any, index: number) => void;
    removeChild: (child: any) => void;

    refresh: () => void;

    render: () => void;
}>({
    name: 'Dynamic Component',
    displayNodeName: 'Dynamic Component',
    color: 'visual',
    category: 'Visual',
    allowChildren: true,
    inputs: {
        component: {
            group: 'Dynamic',
            displayName: 'Component',
            type: 'component'
        }
    },
    changed: {
        component: function (newValue, oldValue) {
            this.refresh()
        },
    },
    initialize: function () {
        this._internal.children = []

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

        getChildren() {
            return this._internal.children;
        },
        addChild(child, index: number) {
            child.parent = this._internal.target;
            this._internal.children.push(child);
        },
        removeChild(child) {
            const index = this._internal.children.indexOf(child);
            if (index !== -1) {
                this._internal.children.splice(index, 1);
                child.parent = undefined;

                this.context.scheduleUpdate()
            }
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
        
        render() {
            if (!this._internal.node) {
                // @ts-expect-error render is not defined
                return this._internal.children.map(x => x.render())
            }
        }
    }
})

export const module = {
    node: dynamicComponent
}
