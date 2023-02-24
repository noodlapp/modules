import * as Noodl from '@noodl/noodl-sdk'

export const iconSpinner = Noodl.defineReactNode({
    name: 'Icon Spinner',
    category: 'Icons',
    getReactComponent: () => (props: {
        color: string
    }) => (
        <svg
            role="img"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                stroke: props.color
            }}
        >
            <title>Loading...</title>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </g>
        </svg>
    ),
    inputProps: {
        color: {
            displayName: 'Color',
            type: 'color',
            group: 'Style'
        }
    }
})
