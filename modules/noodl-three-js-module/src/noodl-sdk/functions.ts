import { createNodeDefinition } from './internal/node';
import { InternalNodeDefinition } from './internal/common';
import { NodeDefinition, ReactNodeDefinition, NodeCtor } from './types/node';
import { ModuleDefinition } from './types/module';
import { TSFixme } from './global'

/**
 * Create a new logic node.
 *
 * @param def 
 * @returns 
 */
export function defineNode<TInstance = {}>(def: NodeDefinition<TInstance>): NodeCtor {
    const internalDefinition = createNodeDefinition(def)

    return {
        node: internalDefinition,
        setup: def.setup
    };
}

/**
 * 
 * @param def 
 * @returns 
 */
export function defineCollectionNode(def: TSFixme): NodeCtor {
    const _def: NodeDefinition = {
        name: def.name,
        category: def.category,
        color: 'data',
        inputs: def.inputs,
        outputs:Object.assign({
            Items:'array',
            'Fetch Started':'signal',
            'Fetch Completed':'signal'
        }, def.outputs || {}),
        signals:Object.assign({
            Fetch:function() {
                var _this = this;
                this.sendSignalOnOutput('Fetch Started');
                var a = def.fetch.call(this,function() {
                    _this.sendSignalOnOutput('Fetch Completed');
                });
                this.setOutputs({
                    Items:a
                })
            }
        }, def.signals || {})
    }

    return defineNode(_def);
}

/**
 * 
 * @param def 
 * @returns 
 */
export function defineModelNode(def: TSFixme) {
    const _def = {
        name:def.name,
        category:def.category,
        color:'data',
        inputs:{
            Id:'string'
        },
        outputs:{
            Fetched:'signal'
        },
        changed:{
            // @ts-expect-error
            Id: function(value) {
                if(this._object && this._changeListener)
                    this._object.off('change',this._changeListener)
                
                // @ts-expect-error
                this._object = Noodl.Object.get(value);
                // @ts-expect-error
                this._changeListener = (name,value) => {
                    const _o = {}
                    // @ts-expect-error
                    _o[name] = value;
                    this.setOutputs(_o)
                }
                this._object.on('change',this._changeListener)

                this.setOutputs(this._object.data);
                this.sendSignalOnOutput('Fetched');
            }
        },
        initialize:function() {

        }
    }

    for(var key in def.properties) {
        // @ts-expect-error
        _def.inputs[key] = def.properties[key];
        // @ts-expect-error
        _def.outputs[key] = def.properties[key];
        // @ts-expect-error
        _def.changed[key] = (function() { const _key = key; return function(value) {
            if(!this._object) return;
            this._object.set(_key,value);
        }})()
    }
    
    // @ts-expect-error
    return defineNode(_def);
}

/**
 * Create a new React node.
 *
 * @param def 
 * @returns 
 */
export function defineReactNode<TInstance = {}>(def: ReactNodeDefinition<TInstance>): InternalNodeDefinition {
    const internalDefinition = createNodeDefinition(def);
    internalDefinition.getReactComponent = def.getReactComponent;
    internalDefinition.inputProps = def.inputProps;
    internalDefinition.inputCss = def.inputCss;
    internalDefinition.outputProps = def.outputProps;
    internalDefinition.setup = def.setup;
    internalDefinition.frame = def.frame;

    return internalDefinition;
}

export function defineModule(def: ModuleDefinition): void {
    // HACK: Making webpack think that the method is in here. 

    // @ts-ignore
    return Noodl.defineModule(def);
}

export function getProjectSettings(): { [key: string]: unknown } {
    // HACK: Making webpack think that the method is in here. 

    // @ts-ignore
    return Noodl.getProjectSettings();
}

export function runDeployed(): boolean {
    // HACK: Making webpack think that the method is in here. 
    
    // @ts-ignore
    return Noodl.runDeployed;
}
