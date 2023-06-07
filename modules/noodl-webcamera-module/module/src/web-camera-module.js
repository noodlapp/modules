const Noodl = require('@noodl/noodl-sdk');

const WebCameraNode = Noodl.defineNode({
	category:'Camera',
	name:'Web Camera',
    docs:'https://docs.noodl.net/modules/webcamera/webcamera-node',
	initialize() {
        this.inputs.frontFacing = true;
	},
	signals:{
		startStream:{
			displayName:'Start Stream',	
			signal:function() {
				this.startStream();
			},
		},
		stopStream:{
			displayName:'Stop Stream',
			signal:function() {
				this.stopStream();
			}
		}
	},
	changed:{
		frontFacing:function(value) {
			this.stopStream();
			this.startStream();
		},
		frameRate:function(value) {
			this.stopStream();
			this.startStream();		
		}
	},
    inputs: {
        frontFacing: {
			type: 'boolean',
			displayName:'Front Facing',
            default: true
        },
        frameRate: {
			displayName:'Frame Rate',
            type: 'number'
        }
    },
    outputs: {
        stream: {
            type: 'mediastream',
            displayName: 'Media Stream'
        },
        streamStarted: {
            displayName: 'Media Stream Started',
            type: 'signal'
        },
        streamStopped: {
            displayName: 'Media Stream Stopped',
            type: 'signal'
        }
    },
    methods: {
        startStream() {
			this.isStreaming = true;
            const facingMode = this.inputs.frontFacing ? 'front' : 'environment';
            const constraints = {
                video: {facingMode}
            };
            if(this.inputs.frameRate !== undefined) {
                constraints.video.frameRate = {ideal: this.inputs.frameRate};
            }

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    if(this.isStreaming === false) {
                        //user stopped stream before it had time to start
                        return;
					}
					
					this.setOutputs({
						stream:stream
					})

                    this.sendSignalOnOutput('streamStarted');
                })
                .catch(err => {
                    console.log("Web Camera stream error", err);
                    this.isStreaming = false;
                });
        },
        stopStream() {
            if(!this.isStreaming) return;

            this.isStreaming = false;
            const stream = this.outputs.stream;

            const tracks = stream.getTracks();
            for(const track of tracks) {
                track.stop();
                stream.removeTrack(track);
			}
			this.setOutputs({
				stream:null
			})
            this.sendSignalOnOutput('streamStopped');
        }
    }
})

Noodl.defineModule({
    nodes:[
	 WebCameraNode
    ],
    setup() {
    }
});