import { defineModule } from '@noodl/noodl-sdk';

import Worker from './nodes/worker';
import ReceiveMessage from './nodes/receiveMessage';
import SendMessage from './nodes/sendMessage';

defineModule({
	nodes: [Worker, ReceiveMessage, SendMessage]
});
