const Noodl = require('@noodl/noodl-sdk');
const Lottie = require('lottie-web');


class LottieComponent extends React.Component {

	constructor(props) {
		super(props);

		this.onComplete = () => {
			this.props.onComplete && this.props.onComplete();
		};
	}

	componentDidMount() {
		this.setupLottie(this.props);
	}

	componentWillUpdate(nextProps) {
		const dataChanged = this.props.renderer !== nextProps.renderer ||
			this.props.loop !== nextProps.loop ||
			this.props.autoplay !== nextProps.autoplay ||
			this.props.path !== nextProps.path;

		if(dataChanged && this.lottie) {
		  this.lottie.destroy();
		  this.setupLottie(nextProps);
		}
	  }

	setupLottie(props) {
		this.lottie = Lottie.loadAnimation({
			container: this.el,
			renderer: props.renderer,
			loop: props.loop,
			autoplay: props.autoplay,
			path: props.path
		});

		this.lottie.addEventListener('complete', this.onComplete);
	}

	componentWillUnmount() {
		this.lottie && this.lottie.destroy();
	}

	play() {
		this.lottie && this.lottie.goToAndPlay(0);
	}

	pause() {
		this.lottie && this.lottie.pause();
	}

	render() {
		return <div ref={ref => this.el=ref}></div>
	}
}

const LottieNode = Noodl.defineReactNode({
	name: 'Lottie',
	category: 'Lottie',
	docs: 'https://docs.noodl.net/modules/lottie/lottie-node',
	getReactComponent() {
		return LottieComponent;
	},
	inputProps: {
		path: {type: 'string', default: './data.json'},
		loop: {type: 'boolean', default: false},
		autoplay: {type: 'boolean', default: true},
		renderer: {
			type: {
				name: 'enum',
				enums: [{label: 'SVG', value: 'svg'}, {label: 'Canvas', value: 'canvas'}, {label: 'HTML', value: 'html'}]
			},
			default: 'svg'
		}
	},
	outputProps: {
		onComplete: {
			type: 'signal',
			displayName: 'Complete'
		}
	},
	signals: {
		play: {
			displayName: 'Play',
			signal() {
				this.innerReactComponentRef && this.innerReactComponentRef.play();
			}
		}
	}
})


Noodl.defineModule({
    reactNodes: [
    	LottieNode
    ],
    nodes:[
    ],
    setup() {
    }
});