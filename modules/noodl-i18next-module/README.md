# Noodl i18next module
Module for using [i18next](https://www.i18next.com) in Noodl.
The module has three nodes, i18next, Language Bundle and Translation.

# i18next
This is used to register bundles and to set and get language.
## Inputs
### Language (string)
### ChangeLanguage (signal)

These two are used in combination to set a new language. The Language string should be a language code, and is matched to a language bundle. For example `en` for English.

## Outputs
### LanguageChanged (signal)
### CurrentLanguage (string)

**LanguageChanged** is triggered whenever the language is changed, for example when using the **ChangeLanguage** signal. If, for example, your Noodl project needs to take action when the language is changed, you can use this signal. **CurrentLanguage** contains the language code of the currently set language.

# LanguageBundle

The language bundle contains the translations for a language. If you have multiple languages you will have one LanguageBundle for each language and they generally should contain the same strings, translated to the respective language.

Each language bundle also has a "Namespace". This can be used to separate different parts of translations to different bundles that can be loaded at different times. For example you can have one bundle for static UI-texts called "UI" and one bundle for texts that are dynamically loaded based on content in the database called "Dbtexts". If you support two languages, English and Spanish, this would mean that you have four language bundle nodes: UI and Dbtexts for English and Spanish.

The bundle itself is a JSON-object, as described on [i18next website](https://www.i18next.com/translation-function/essentials). It contains `key:string` pairs for each text. It can also include an inner structure (JSON objects) to help organize strings based on features. Aa bundle for English could look like this:

```json
{
  "loginpage":{
    "user_name":"User Name",
    "confirm_button":{
      "label":"Confirm",
      "hover_text":"Press here to confirm"
    }
}
```

In this example the key `loginpage.confirm_button.hover_text` would identify the button hover text translation when used in a Translation node.
Note that i18next supports various dynamic features in the texts, e.g. plurals, date formats, etc. These are generally supported when used in Noodl.

There are typically two ways to use Language Bundles. For static texts, for example UI texts, you edit the bundle object directly in Noodl (pressing the "Edit" button on the property panel). As you build the UI you add new texts to the bundle. You have one bundle per language. For dynamic texts, for example loaded during execution from a database, you programatically create bundle objects and load them into the **LanguageBundle** when available and using the AddBundleObject input.

## Inputs
### Language (string)
The language that this bundle applies to. Typically a language code, e.g. `en`.

### Namespace (string)
The name of the Namespace. Can by any string.

### AddResource (signal)
### ResourceKey (string)
### ResourceValue (string)
These three inputs are used in combination to add a single new key/string to the bundle.

### AddBundleObject (signal)
### Resource Bundle Object (javascript object)
These two inputs are used in combination to add a complete Bundle object to the bundle.

# Outputs
## BundleLoaded (signal)
Triggered when a new bundle object has been loaded.

# Translation
This is the node where the translation happens. You typically connect these to your Text nodes and Text Input nodes. Translation nodes automatically change their output if language changes, if the bundle is changing, and when it becomes available.

There are two dynamic features in the Translation node:
* If your translation includes some of i18next dynamic features, for example having a `{{count}}` variable deciding between a plural string or not, or by inserting variables in the middle of the string, any variables used can be added as inputs on the Translation node, and be connected to other nodes in Noodl. For example if a translation uses the variable `{{count}}` adding an input named "count" and connecting it to a Number node, the translation will change when the Number node is updated.

* The name of the key can be dynamic. In most cases the key of a translation is known when building the app, but there are cases when the name of the key is only known during runtime. For example, in a database with thousands of products and related texts translated to multiple languages, the translations are generated when needed. The name of the keys are also generated dynamically. A product with an id `xyz123abc` may have its translations stored in an object named `xyz123abc`, `{"xyz123abc":{"label":"Product A", "desc":"A great product"}}`. By using dynamic naming of the key in a Translation node, using the {}-pattern, the actual key can be resolved at runtime. In this scenario naming the Key in the translation node `{product_id}.label`, will expose a new input to the Translation node called "product_id" that can be connected to a Model node in Noodl.

## Inputs
### Key (string) 
The key of the translation. This can be a static text or a text including one or more variables using `{var}` syntax. Variables will become available as inputs.

### Namespace (string)
The namespace that this translation is using. Should match a namespace of a Language Bundle.

You can also add custom inputs to the translation node. They will be mapped to variables in the translated text itself (`{{var}}`) to make use of the i18next transformation functionality, such as plurals.

## Outputs
### Translation (string)
This contains the translated text.



