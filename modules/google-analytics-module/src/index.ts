import * as Noodl from '@noodl/noodl-sdk'
import { GoogleAnalyticsInitializer } from './nodes/GoogleAnalyticsInitializer'
import { SendAnalyticsData } from './nodes/SendAnalyticsData'

Noodl.defineModule({
    reactNodes: [GoogleAnalyticsInitializer],
    nodes: [SendAnalyticsData],
})
