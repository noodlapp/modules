const Noodl = require('@noodl/noodl-sdk');
import ReactMarkdown from 'react-markdown';

function MarkdownComponent(props) {
	const {openLinksInNewTab, ...otherProps} = props;
	return <ReactMarkdown {...otherProps} linkTarget={openLinksInNewTab ? '_blank' : '_self'} />
}

const MarkdownNode = Noodl.defineReactNode({
	name: 'Markdown',
	category: 'Visual',
	getReactComponent() {
		return MarkdownComponent;
	},
	inputProps: {
		className: {
			type: 'string',
			displayName: 'CSS Class',
			default: 'markdown'
		},
		source: {
			type: {
                name: 'string',
                multiline: true
            }
		},
		allowDangerousHtml: {
			type: 'boolean',
			default: true,
			displayName: 'Allow HTML'
		},
		openLinksInNewTab: {
			type: 'boolean',
			default: true,
			displayName: 'Open Links in tab'
		}
	}
});

Noodl.defineModule({
    reactNodes: [
    	MarkdownNode
    ],
    nodes:[
    ],
    setup() {
    }
});