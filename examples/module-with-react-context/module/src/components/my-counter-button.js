import React from "react";
import { defineReactNode } from '@noodl/noodl-sdk';

import { useCounterContext } from '../context/my-counter-context';

function CounterButton() {
	const { count, increment } = useCounterContext();

	return <button onClick={increment}>Increment: {count}</button>
}

export default defineReactNode({
	name: 'My Counter Button',
	allowChildren: true,
	getReactComponent() {
		return CounterButton;
	}
});
