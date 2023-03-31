//convert "heyHi" to "Hey Hi"
function camelCaseToCapitalized(str) {
  return str
    .replace(/([A-Z])/g, " $1") //insert space
    .replace(/^./, function (str) {
      return str.toUpperCase();
    }); //uppercase first letter
}

export interface Input {
  options: {
    name: string;
    displayName?: string;
    type?: any;
    group?: string;
    transformTo?: (args: any) => any;
    transformFrom?: (args: any) => any;
  }[];
  group: any;
  namespace?: string;
  defaults?: any;
}

//reduces some of the Noodl boiler plate for setting up inputs
export function generateInputs({ options, group, namespace, defaults }: Input) {
  const inputs: {
    [key: string]: any;
  } = {};

  options.forEach((option) => {
    const name = option.name;
    const inputName = namespace ? namespace + "." + name : name;
    const type = (defaults && defaults[name]) || "*";
    const transformFrom = option.transformFrom
      ? option.transformFrom(type)
      : undefined;

    inputs[inputName] = {
      group: option.group || group,
      displayName: option.displayName
        ? option.displayName
        : camelCaseToCapitalized(name),
      type: option.type ? option.type : type,
      default: transformFrom,
    };
  });

  return inputs;
}

interface InputChanged {
  options: any;
  namespace?: any;
}

//generates an inputs changed function that change a chart.js option
export function generateInputsChanged({ options, namespace }: InputChanged) {
  const changed = {};
  
  options.forEach((option) => {
    const name = option.name ? option.name : option;
    const inputName = namespace ? namespace + "." + name : name;

    changed[inputName] = function (value) {
      if (!this.chart) return;

      let options = this.chart.options;
      if (namespace) {
        namespace.split(".").forEach((n) => (options = options[n]));
      }

      const newValue = option.transformTo ? option.transformTo(value) : value;
      
      if (name.includes('.')) {
        // Create nested objects
        const split: string[] = name.split('.');
        let previous = null;
        for (let index = 0; index < split.length - 1; index++) {
          previous = (previous || options)[split[index]];
        }
        previous[split.pop()] = newValue;
      } else {
        options[name] = newValue;
      }

      this.chart.update();
    };
  });

  return changed;
}

export function generateEnum(array) {
  return {
    name: "enum",
    enums: array.map((v) => {
      return { label: camelCaseToCapitalized(v), value: v };
    }),
  };
}

export function toNoodlFontClass(family) {
  if (family && family.split(".").length > 1) {
    family = family.replace(/\.[^/.]+$/, "");
    family = family.split("/").pop();
  }
  return family;
}
