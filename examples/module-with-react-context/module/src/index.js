import { defineModule } from '@noodl/noodl-sdk';

import MyCounterContext from './context/my-counter-context';
import MyCounterButton from './components/my-counter-button';

defineModule({
	reactNodes: [MyCounterContext, MyCounterButton],
});
