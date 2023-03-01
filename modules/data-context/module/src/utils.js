//JSON replacer to make cyclic objects non-cyclic.
//Using this example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#examples
export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  };
}

export function getContextInputProperties(contextNodes, contextName) {
  const dataContexts = contextNodes
    .filter((x) => x.parameters.contextName === contextName);

  const properties = dataContexts
    .reduce((previous, item) => {
      item.parameters.contextInputs.forEach((prop) => {
        // TODO: Collision if the name is taken
        previous[prop.label] = {
          id: prop.id,
          type: item['intype-' + prop.label] || '*'
        };
      });
      return previous;
    }, {});

  return properties;
}

export function getContextOutputProperties(contextNodes, contextName) {
  const dataContexts = contextNodes
    .filter((x) => x.parameters.contextName === contextName);

  const properties = dataContexts
    .reduce((previous, item) => {
      item.parameters.contextInputs.forEach((prop) => {
        // TODO: Collision if the name is taken
        previous[prop.label] = {
          id: prop.id,
          type: item['proptype-' + prop.label] || '*',
        };
      });
      return previous;
    }, {});

  return properties;
}
