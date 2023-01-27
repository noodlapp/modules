import { defineModule } from '@noodl/noodl-sdk';

import Context from './nodes/context';
import getState from './nodes/getState';
import setState from './nodes/setState';
import Subscriber from './nodes/subscriber';

defineModule({
	nodes: [Context, getState, setState, Subscriber]
});
