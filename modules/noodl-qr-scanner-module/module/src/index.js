const Noodl = require('@noodl/noodl-sdk');
//import QrScanner from 'qr-scanner';
const QrScanner = require('qr-scanner').default;

const CameraQRScannerNode = Noodl.defineNode({
	category:'Camera',
	name:'Camera QR Scanner',
	initialize:function () {
		this._internal.qrScanner = null;
		this._internal.currentOptions = {returnDetailedScanResult:false,
			/*flashOn:this.inputs.flashOn,*/
			frontFacing:this.inputs.frontFacing === true?'user':'environment',
			maxScansPerSecond:25
		};
		this._internal.scanStarted = false;
		this._internal.scannerCreationScheduled = false;
		this._internal.lastScanResult = '';
		this.setOutputs ({validScan:false});
	},
	inputs:{
		 frontFacing: {
			type: 'boolean',
			displayName:'Front Facing',
            default: true
        }/*,
        flashOn: {
        	type: 'boolean',
        	displayName:'Flash On',
        	default: false
        }*/,
        videoNode: {
        	displayName:'Video Node',
        	type: '*'
        },
        maxScansPerSecond: {
        	displayName:'Max Scans per second',
        	type: 'number',
        	default: 25
        }
	},
	outputs:{
		
        result:{
        	type:'string',
        	displayName: 'Scan Result'
        },
        scanSuccess: {
        	type:'signal',
        	displayName: 'Scan Successful'
        },
        scanFailed: {
        	type:'signal',
        	displayName: 'Scan Failed'
        },
        validScan: {
        	type:'boolean',
        	displayName: 'Valid Scan'
        }
        
	},
	signals:{
		start:{
			displayName:'Start',	
			signal:function() {
				console.log ("Start");
				this._internal.scanStarted = true;
				if (this._internal.qrScanner !== null) {
					this._internal.qrScanner.start ();
				}
			},
		},
		stop:{
			displayName:'Stop',
			signal:function() {
				this._internal.scanStarted = false;
				if (this._internal.qrScanner !== null) {
					this._internal.qrScanner.stop ();
				}
				
			}
		}
	},
	changed:{
		frontFacing:function () {
			this._internal.currentOptions.preferredCamera = this.inputs.frontFacing === true?'user':'environment';
			if (this._internal.qrScanner !== null) {
				this._internal.qrScanner.setCamera (this.inputs.frontFacing === true?'user':'environment');
			}
		}/*,
		flashOn:function () {
			this._internal.currentOptions.flashOn = this.inputs.flashOn;
			if (this._internal.qrScanner !== null) {
				if (this.inputs.flashOn === true) {
					this.setFlashState (true);
				}
				else {
					this.setFlashState (false);
				}
			}
		}*/,

		videoNode:function () {
			console.log ("change in videoNode", this.inputs.videoNode);
			/*if (this.inputs.videoNode !== undefined && this.inputs.videoNode !== null && this._internal.qrScanner === null) {
				this.createQRScanner (this._internal.currentOptions);
				if (this._internal.scanStarted === true) {
					this._internal.qrScanner.start ();
				}
			}*/
			this.scheduleScannerCreation (false);
		},
		maxScansPerSecond:function () {
			
			this._internal.currentOptions.maxScansPerSecond = this.inputs.maxScansPerSecond;
			if (this._internal.qrScanner !== null) {
				console.log ("Warning: Cannot change maxScansPerSecond after node is created");
			}
		}
	},
	methods:{
		createQRScanner : function (options) {
			if (this._internal.qrScanner !== null) {
				// destroy the old qr scanner
				console.log ("destroying scanner");
				this._internal.qrScanner.destroy ();
				this._internal.qrScanner = null;
			} 
			if (this._internal.qrScanner === null) {
				
				console.log ("creating qrscanner ", this.inputs.videoNode);

				options.onDecodeError = (error) => {
					if (this._internal.lastScanResult !== '') {
						this._internal.lastScanResult = '';
						this.setOutputs ({result:'', validScan:false});
						this.sendSignalOnOutput ("scanFailed");

					}	
				};

				this._internal.qrScanner = new QrScanner(this.inputs.videoNode, result => {
					if (this._internal.lastScanResult === '') {
						this.setOutputs ({result:result.data, validScan:true}); 
						this.sendSignalOnOutput ("scanSuccess");
						this._internal.lastScanResult = result.data;
					}
					else if (this._internal.lastScanResult !== result.data) {
						this.setOutputs ({result:result.data}); 
						this.sendSignalOnOutput ("scanSuccess");
						this._internal.lastScanResult = result.data;
					}
					
				}, options);
				if (this._internal.scanStarted === true) {
					this._internal.qrScanner.start ().then ( () => {
						/*if (options.flashOn === true) {
							this.setFlashState (true);
						}*/
					});
				}
				
			}
		}/*,
		setFlashState: function (state) {
			if (this._internal.qrScanner !== null) {
				this._internal.qrScanner.hasFlash ().then ( (hasFlash) => {
					if (hasFlash === true) {
						if (state === true) {
							this._internal.qrScanner.turnFlashOn();
						}
						else {
							this._internal.qrScanner.turnFlashOff();
						}
					}
					else {
						console.log ("This device camera has no flash");
					}
				});
			}
		}*/,
		scheduleScannerCreation:function () {
			if (this._internal.scannerCreationScheduled === false) {
				this._internal.scannerCreationScheduled = true;
				this.scheduleAfterInputsHaveUpdated ( () => {
					this._internal.scannerCreationScheduled = false;
					if (this.inputs.videoNode !== undefined && this.inputs.videoNode !== null) {
						if (this._internal.qrScanner !== null) {
							console.log ("Cannot re-create scanner");
							return; // we already have a scanner so do nothing
						}
						this.createQRScanner (this._internal.currentOptions);
					}
				});
			}
		},
		onNodeDeleted:function () {
			if (this._internal.qrScanner !== null) {
				// destroy the old qr scanner
				console.log ("destroying scanner");
				this._internal.qrScanner.destroy ();
				this._internal.qrScanner = null;
			}
		}
	}
})

const ImageQRScannerNode = Noodl.defineNode({
	category:'Image',
	name:'Image QR Scanner',
	initialize:function () {
		this.setOutputs ({validScan:false});
	},
	inputs:{
		file: {
			type: 'file',
			displayName:'Image File'
        }
	},
	outputs:{
        result:{
        	type:'string',
        	displayName: 'Scan Result'
        },
        scanSuccess: {
        	type:'signal',
        	displayName: 'Scan Successful'
        },
        scanFailed: {
        	type:'signal',
        	displayName: 'Scan Failed'
        },
        validScan: {
        	type:'boolean',
        	displayName: 'Valid Scan'
        }  
	},
	signals:{
		scan:{
			displayName:'Scan',	
			signal:function() {
				console.log ("Scan");
				if (this.inputs.file === undefined) {
					console.log ("Warning: no file to scan for QR code");
					return;
				}
				QrScanner.scanImage (this.inputs.file, {returnDetailedScanResult:true}).then ( (result) => {
					this.setOutputs ({result:result.data, validScan:true}); 
					this.sendSignalOnOutput ("scanSuccess");
				}).catch ( (error) => {
					this.setOutputs ({result:'', validScan:false}); 
					this.sendSignalOnOutput ("scanFailed");
				});

			},
		}
	},
	changed:{
		
	},
	methods:{
		
	}
})

Noodl.defineModule({
    nodes:[
		CameraQRScannerNode,
		ImageQRScannerNode
    ],
    setup() {
    	//this is called once on startup
    }
});


