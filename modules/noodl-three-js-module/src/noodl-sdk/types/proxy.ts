type Dictionary = { [key: string]: unknown };

export type Proxy = Object | Array;

/**
 * Objects are saved globally and indexed by the unique id.
 * 
 * Remarks: Internally this is called "Model"
 * 
 * Events:
 *    - event: 'change'
 *      args:  { name: string, value: unknown, old: unknown }
 */
export declare class Object<T extends Dictionary = {}> {
    /**
     * @returns the unique object by id.
     */
    public static get(id: string): Object;

    /**
     * Create a new object.
     *
     * @param value 
     */
    public static create<T extends Dictionary = {}>(data: {
        /**
         * Object id, if undefined then it will create a new unique id.
         */
        id?: string | undefined;
    } & T): Object<T>;

    /**
     * Check if the global object exists.
     * 
     * @param id The unique id
     * @returns True, when the object exists; otherwise, false.
     */
    public static exists(id: string): boolean;

    /**
     * @returns a new unique id.
     */
    public static guid(): string;

    id: string;
    data: T | undefined;

    /**
     * @returns The unique id of this object.
     */
    public getId(): string;

    /**
     * 
     */
    public get<TKey extends keyof T>(
        name: TKey,
        args?: {
        /**
         * Resolve nested paths
         * Example: 'object.nested.value'
         */
        resolve: boolean
        } | undefined
    ): T[TKey] | undefined;

    /**
     * Dispatch an event.
     *
     * @param eventName The name of the event.
     * @param args The args that will be passed to the event.
     */
    public notify(eventName: string, args: Dictionary): void;

    /**
     * Add an event listener.
     * 
     * @param eventName The name of the event.
     * @param listener
     *    Dispatch function, `args` should match what `notify` is sending.
     */
    public on(eventName: string, listener: (args: Dictionary) => void): void;

    /**
     * Remove an event listener.
     * 
     * @param eventName The name of the event.
     * @param listener
     *    Dispatch function, `args` should match what `notify` is sending.
     */
    public off(eventName: string, listener: (args: Dictionary) => void): void;

    /**
     * Update the values that are different and
     * trigger a `change` event per property.
     *
     * @param object 
     */
    public setAll(object: Dictionary): void;

    /**
     * Update a value and trigger `change` event if notify is True.
     * 
     * @param key 
     * @param value 
     * @param notify 
     */
    public set(
        key: string,
        value: unknown,
        args?: {
        /**
         * Resolve nested paths
         * Example: 'object.nested.value'
         */
        resolve: boolean
        /**
         * Whether to dispatch an event of the change.
         */
        silent: boolean;
        } | undefined
    ): void;

    /**
     * @returns json object with all the data.
     */
    public toJSON(): Dictionary;
}

/**
 * Arrays are saved globally and indexed by the unique id.
 * 
 * Items in the array can be Noodl.Object
 * which have some extra features from here.
 *  Events on Noodl.Object:
 *    - event:  'add'
 *      args:   { collection: Array }
 *    - event:  'remove'
 *      args:   { collection: Array }
 * 
 * Remarks: Internally this is called "Collection"
 * 
 * Events:
 *    - event:  'add'
 *      args:   { item: unknown, index: unknown }
 *    - event:  'change'
 *      args:   undefined
 */
export declare class Array<T = unknown> {
    public static get<T>(id: string): Array<T>;
    public static create<T>(items?: T[] | undefined): Array<T>;
    public static instanceOf(collection: Array): boolean;
    public static exists(id: string): boolean;

    id: string;
    items: T[];

    public getId(): string;
    public get(index: number): T;

    public on(eventName: string, listener: (args: unknown) => void): void;
    public off(eventName: string, listener: (args: unknown) => void): void;
    public notify(eventName: string, args: unknown): void;

    public set(src: Array<T> | T[]): void;

    public add(item: T): void;
    public addAtIndex(item: T, index: number): void;

    public removeAtIndex(index: number): void;
    public remove(item: T): void;

    public size(): number;
    public contains(item: T): boolean;

    /** @deprecated */
    public each(callback: (item: T, index: number) => void): void;
    public forEach(callback: (item: T, index: number) => void): void;

    public map(
        predicate: (value: T, index: number, array: any[]) => value is any
    ): any[];

    public filter(
        predicate: (value: T, index: number, array: any[]) => value is any
    ): any[];

    public find(
        predicate: (value: T, index: number, array: any[]) => value is any,
        thisArg?: unknown | undefined
    ): void;

    public findIndex(
        predicate: (value: T, index: number, array: any[]) => value is any,
        thisArg?: unknown | undefined
    ): number;

    public toJSON(): Dictionary;
}
