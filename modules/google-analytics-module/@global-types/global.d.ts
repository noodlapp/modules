import { TSFixme } from '@noodl/noodl-sdk'

export {}

declare global {
    interface Window {
        dataLayer?: TSFixme[]
        gtag?: TSFixme
    }
}
