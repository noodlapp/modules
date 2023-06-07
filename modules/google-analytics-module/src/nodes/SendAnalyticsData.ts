import * as Noodl from '@noodl/noodl-sdk'
import { MODULE_NAMESPACE } from '../constants'

export const SendAnalyticsData = Noodl.defineNode({
    name: `${MODULE_NAMESPACE}.sendAnalyticsData`,
    displayName: 'Send Google Analytics Data',
    docs: 'https://docs.noodl.net/#/modules/google-analytics/nodes/send-google-analytics-data/README.md',
    signals: {
        Do() {
            if (typeof window.gtag === 'undefined') {
                console.warn(
                    'Noodl Google Analytics Module: Tracking script not loaded. This might be because of a user opt-out.'
                )
                return null
            }

            let args

            try {
                args = JSON.parse('[' + this.inputs.TrackingCode + ']')
            } catch {
                args = (0, eval)('([' + this.inputs.TrackingCode + '])')
            }

            window.gtag(...args)

            this.sendSignalOnOutput('DataSent')
        },
    },
    inputs: {
        TrackingCode: {
            displayName: 'Gtag Tracking Data',
            type: { name: 'string', codeeditor: 'javascript' },
            default: '"event", "search", {"term": "Udon"}',
            group: 'Analytics',
        },
    },

    outputs: {
        DataSent: {
            type: 'signal',
            displayName: 'Data Sent',
            group: 'Analytics',
        },
    },
})
