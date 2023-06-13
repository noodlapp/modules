const Noodl = require('@noodl/noodl-sdk')
const useRef = require('react').useRef
const useEffect = require('react').useEffect
const useState = require('react').useState

// Handles if we want to run javascript
function RenderContainer(props) {
    const divRef = useRef(null)
    const [parsedMarkup, setParsedMarkup] = useState()

    // Parse markup
    useEffect(() => {
        if (!props.html) return

        let newHtml = props.html

        if (props.templateStringAndValue) {
            Object.keys(props.templateStringAndValue).forEach((key) => {
                newHtml = newHtml.replaceAll(
                    key,
                    props.templateStringAndValue[key] || ''
                )
            })
        }

        setParsedMarkup(newHtml)
    }, [props])

    // Inject JS in a hacky way to allow it to run
    useEffect(() => {
        if (!props.runJs || !divRef.current) return

        const htmlSlot = document
            .createRange()
            .createContextualFragment(parsedMarkup)
        divRef.current.innerHTML = ''
        divRef.current.appendChild(htmlSlot)
    }, [parsedMarkup, props.runJs])

    return (
        <div
            className={props.className}
            style={props.style}
            dangerouslySetInnerHTML={
                props.runJs ? null : { __html: parsedMarkup }
            }
            ref={divRef}
        />
    )
}

const InlineHtml = Noodl.defineReactNode({
    name: 'module.inlineHtml',
    displayName: 'Custom HTML',
    docs: 'https://docs.noodl.net/#/modules/custom-html/README.md',
    category: 'Visual',

    getReactComponent() {
        return RenderContainer
    },

    inputProps: {
        html: {
            displayName: 'HTML',
            type: { name: 'string', codeeditor: 'html' },
            default: '',
        },
        runJs: {
            displayName: 'Run inline JavaScript',
            type: { name: 'boolean' },
            default: false,
        },
    },

    methods: {
        setTemplateVariable: function (name, templateString, value) {
            this.model.inputs[name] = value

            if (!this.props.templateStringAndValue) {
                this.props.templateStringAndValue = {}
            }

            this.props.templateStringAndValue[templateString] = value

            this.forceUpdate()
        },

        registerInputIfNeeded: function (name) {
            if (this.hasInput(name)) return

            if (name.startsWith('prop-')) {
                this.registerInput(name, {
                    set: this.setTemplateVariable.bind(
                        this,
                        name.substring('prop-'.length),
                        this.model.templateStrings[name]
                    ),
                })
            }
        },
    },

    setup(context, graphModel) {
        function _managePortsForNode(node) {
            function _updatePorts() {
                const ports = []

                if (node.parameters.html) {
                    // TODO: Maybe find a better way of handling the strings
                    // without having to reset them every time
                    node.templateStrings = {}

                    const regexp = /\{{2}([^}]+)\}{2}/g
                    const matches = node.parameters.html.matchAll(regexp)

                    for (match of matches) {
                        const key = match[1].trim()
                        const propName = `prop-${key}`
                        const templateString = match[0]

                        if (
                            Object.keys(node.templateStrings).includes(propName)
                        ) {
                            continue
                        }

                        node.templateStrings[propName] = templateString

                        ports.push({
                            name: propName,
                            displayName: key,
                            group: 'Variables',
                            type: '*',
                            plug: 'input',
                        })
                    }

                    context.editorConnection.sendDynamicPorts(node.id, ports)
                }
            }

            _updatePorts()

            node.on('parameterUpdated', (event) => {
                _updatePorts()
            })
        }

        graphModel.on('nodeAdded.module.inlineHtml', (node) => {
            _managePortsForNode(node)
        })

        for (const node of graphModel.getNodesWithType(
            'noodl.module.inlineHtml'
        )) {
            _managePortsForNode(node)
        }
    },
})

Noodl.defineModule({
    reactNodes: [InlineHtml],
    nodes: [],
    setup() {
        //this is called once on startup
    },
})
