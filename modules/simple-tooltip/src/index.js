import { defineModule } from '@noodl/noodl-sdk';

import 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';

import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/perspective-extreme.css';
import 'tippy.js/animations/perspective-subtle.css';

import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/animations/scale-subtle.css';

import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/shift-away-extreme.css';
import 'tippy.js/animations/shift-away-subtle.css';

import 'tippy.js/animations/shift-toward.css';
import 'tippy.js/animations/shift-toward-extreme.css';
import 'tippy.js/animations/shift-toward-subtle.css';

import showTooltip from './nodes/showTooltip';
import tooltip from './nodes/tooltip';

defineModule({
	name: "simple-tooltip",
	reactNodes: [tooltip],
	nodes: [showTooltip]
});
