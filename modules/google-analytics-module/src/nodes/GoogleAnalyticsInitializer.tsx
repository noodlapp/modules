import * as Noodl from '@noodl/noodl-sdk'
import { useEffect } from 'react'
import { MODULE_NAMESPACE } from '../constants'

const NODE_NAME = `${MODULE_NAMESPACE}.analyticsLoader`

interface IInitializerComponentProps {
    measurementId: string
    allowTracking: boolean
}

function InitializerComponent({
    measurementId,
    allowTracking,
}: IInitializerComponentProps): null {
    useEffect(() => {
        if (window.history?.pushState) {
            const pushState = window.history.pushState.bind(history)
            const pushstateEvent = new Event('pushstate')

            // hacking pushstate to send custom event
            window.history.pushState = function (state, title, url) {
                pushState(state, title, url)
                window.dispatchEvent(pushstateEvent)
            }
        }
    }, [])

    useEffect(() => {
        if (measurementId && allowTracking) {
            const script = document.createElement('script')
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
            document.head.appendChild(script)
            window.dataLayer = window.dataLayer || []
            window.gtag = function () {
                window.dataLayer.push(arguments)
            }

            window.gtag('js', new Date())
            window.gtag('config', measurementId)

            // Listen to push state events and send tracking
            if (window.history?.pushState) {
                //this is event is manually sent on push, so covers both pop and push state
                window.addEventListener('pushstate', sendPageView)
            }
        }

        return () => {
            window.removeEventListener('pushstate', sendPageView)
        }
    }, [measurementId, allowTracking])

    function sendPageView() {
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            send_to: measurementId,
        })
    }

    return null
}

export const GoogleAnalyticsInitializer = Noodl.defineReactNode({
    name: NODE_NAME,
    displayName: 'Google Analytics Root',
    docs: 'https://docs.noodl.net/#/modules/google-analytics/nodes/google-analytics-root/README.md',
    category: 'visual',
    getReactComponent() {
        return InitializerComponent
    },
    inputs: {
        measurementId: {
            displayName: 'Measurement ID',
            type: 'string',
            default: undefined,
            group: 'Analytics',
        },
        allowTracking: {
            displayName: 'Allow Tracking',
            type: 'boolean',
            default: false,
            group: 'Analytics',
        },
    },
    methods: {
        _updateTrackingSignalIfAllowed() {
            if (this.props.allowTracking && this.props.measurementId) {
                this.sendSignalOnOutput('trackingStarted')
            }
        },
    },
    changed: {
        allowTracking(val: boolean) {
            this.props.allowTracking = val
            this._updateTrackingSignalIfAllowed()
            this.forceUpdate()
        },

        measurementId(val: string) {
            this.props.measurementId = val
            this._updateTrackingSignalIfAllowed()
            this.forceUpdate()
        },
    },
    outputProps: {
        trackingStarted: {
            type: 'signal',
            displayName: 'Starting Tracking',
            group: 'Analytics',
        },
    },
    // @ts-ignore
    mountedInput: false,
})
