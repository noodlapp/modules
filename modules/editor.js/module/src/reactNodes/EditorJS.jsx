import React, { useState, useRef, useEffect, useCallback } from "react";

import EditorJS from "@editorjs/editorjs";

// Text and typography
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";

// Lists
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";

// Media & Embed
import SimpleImage from "@editorjs/simple-image";
import LinkTool from "@editorjs/link";
import AttachesTool from "@editorjs/attaches";
// TODO: Do we want https://github.com/editor-js/embed ?

// Table
import Table from "@editorjs/table";

// Code
import CodeTool from "@editorjs/code";
import RawTool from "@editorjs/raw";

// Inline Tools
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import LinkAutocomplete from "@editorjs/link-autocomplete";

// Block Tune Tools
import TextVariantTune from "@editorjs/text-variant-tune";

const DEFAULT_SETUP_SCRIPT = `// In here you can change the Tools configs
//
// For example to change the Header tool config.
// https://github.com/editor-js/header
// Use this code:
//
// tools.header.config = {
//   placeholder: 'Enter a header',
//   levels: [2, 3, 4],
//   defaultLevel: 3
// }

// Internationalization (https://editorjs.io/configuration/#internationalization)
// i18n = { messsages: { /* ... */ } }

// Change the Inline Toolbar order
// inlineToolbar = ['link', 'marker', 'bold', 'italic']

// Change the Block Tunes connection
// tunes = [...]`;

function Component({
  eventHandler,
  value,
  readOnly,
  autofocus,
  placeholder,
  hideToolbar,
  logLevel,
  scriptSetup,
  tool_paragraph_enabled,
  tool_header_enabled,
  tool_quote_enabled,
  tool_warning_enabled,
  tool_delimiter_enabled,
  tool_list_enabled,
  tool_checklist_enabled,
  tool_image_enabled,
  tool_linkTool_enabled,
  tool_attaches_enabled,
  tool_table_enabled,
  tool_code_enabled,
  tool_raw_enabled,
  tool_marker_enabled,
  tool_inlineCode_enabled,
  tool_link_enabled,
  tool_underline_enabled,
  tool_textVariant_enabled,
  outValue,
  outChanged,
  outReady,
}) {
  const rootRef = useRef();
  const editorRef = useRef();
  const lastContent = useRef(value);
  const [_, setRedraw] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;

    if (editorRef.current) {
      editorRef?.current?.destroy();
      editorRef.current = null;
    }

    const tools = {};

    // ---
    // Text and typography
    if (tool_paragraph_enabled) {
      tools.paragraph = {
        class: Paragraph,
        inlineToolbar: true,
      };
    }
    if (tool_header_enabled) {
      // https://github.com/editor-js/header
      tools.header = {
        class: Header,
      };
    }
    if (tool_quote_enabled) {
      // https://github.com/editor-js/quote
      tools.quote = {
        class: Quote,
        inlineToolbar: true,
      };
    }
    if (tool_warning_enabled) {
      // https://github.com/editor-js/warning
      tools.warning = {
        class: Paragraph,
        inlineToolbar: true,
      };
    }
    if (tool_delimiter_enabled) {
      // https://github.com/editor-js/delimiter
      tools.delimiter = {
        class: Delimiter,
      };
    }

    // ---
    // Lists
    if (tool_list_enabled) {
      // https://github.com/editor-js/nested-list
      tools.list = {
        class: NestedList,
        inlineToolbar: true,
      };
    }
    if (tool_checklist_enabled) {
      // https://github.com/editor-js/checklist
      tools.checklist = {
        class: Checklist,
        inlineToolbar: true,
      };
    }

    // ---
    // Media & Embed
    if (tool_image_enabled) {
      // https://github.com/editor-js/simple-image
      // TODO: Image upload?
      tools.image = {
        class: SimpleImage,
      };
    }
    if (tool_linkTool_enabled) {
      // https://github.com/editor-js/link
      tools.linkTool = {
        class: LinkTool,
        // config: {
        //   endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
        // }
      };
    }
    if (tool_attaches_enabled) {
      // https://github.com/editor-js/attaches
      tools.attaches = {
        class: AttachesTool,
        // config: {
        //   endpoint: 'http://localhost:8008/uploadFile'
        // }
      };
    }

    // ---
    // Table
    if (tool_table_enabled) {
      // https://github.com/editor-js/table
      tools.table = {
        class: Table,
      };
    }

    // ---
    // Code
    if (tool_code_enabled) {
      // https://github.com/editor-js/code
      tools.code = {
        class: CodeTool,
      };
    }
    if (tool_raw_enabled) {
      // https://github.com/editor-js/raw
      tools.raw = {
        class: RawTool,
      };
    }

    // ---
    // Inline Tools
    if (tool_marker_enabled) {
      // https://github.com/editor-js/marker
      tools.marker = {
        class: Marker,
      };
    }
    if (tool_inlineCode_enabled) {
      // https://github.com/editor-js/inline-code
      tools.inlineCode = {
        class: InlineCode,
      };
    }
    if (tool_link_enabled) {
      // https://github.com/editor-js/link-autocomplete
      tools.link = {
        class: LinkAutocomplete,
        // config: {
        //   endpoint: 'http://localhost:3000/',
        //   queryParam: 'search'
        // }
      };
    }
    if (tool_underline_enabled) {
      // https://github.com/editor-js/underline
      tools.underline = {
        class: Underline,
      };
    }

    // ---
    // Block Tune Tools
    if (tool_textVariant_enabled) {
      // https://github.com/editor-js/text-variant-tune
      tools.textVariant = {
        class: TextVariantTune,
      };
    }

    let defaultBlock = undefined;
    let i18n = undefined;
    let inlineToolbar = undefined;
    let tunes = undefined;

    if (scriptSetup) {
      try {
        const funcScript = `const tools=this.tools;let defaultBlock=undefined;let i18n=undefined;let inlineToolbar=undefined;let tunes=undefined; ${scriptSetup}; return { defaultBlock, i18n, inlineToolbar, tunes };`;
        const func = new Function(funcScript);
        const result = func.apply({ tools });
        if (typeof result === "object") {
          defaultBlock = result.defaultBlock;
          i18n = result.i18n;
          inlineToolbar = result.inlineToolbar;
          tunes = result.tunes;
        }
      } catch (error) {
        throw error;
      }
    }

    lastContent.current = value;

    const editor = new EditorJS({
      holder: rootRef.current,
      readOnly,
      autofocus,
      placeholder,
      hideToolbar,
      logLevel,
      defaultBlock,
      i18n,
      inlineToolbar,
      tunes,
      data: value,
      onChange: async () => {
        let content = await editor.saver.save();
        outValue(content);
        outChanged();
      },
      onReady() {
        editorRef.current = editor;
        setRedraw(Date.now());
        outReady();
      },
      tools,
    });

    return () => {
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, [rootRef]);

  useEffect(() => {
    function handleFocus() {
      editorRef.current?.focus();
    }
    function handleClear() {
      editorRef.current?.clear();
    }

    eventHandler.addEventListener('focus', handleFocus);
    eventHandler.addEventListener('clear', handleClear);
    return () => {
      eventHandler.removeEventListener('focus', handleFocus);
      eventHandler.removeEventListener('clear', handleClear);
    }
  }, [eventHandler]);

  if (editorRef.current) {
    if (editorRef.current.readOnly.isEnabled !== readOnly) {
      editorRef.current.readOnly.toggle(readOnly);
    }

    if (lastContent.current !== value) {
      // Method removes all Blocks and fills with new passed JSON data.
      editorRef.current.render(value);
      lastContent.current = value;
    }
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      ref={rootRef}
    ></div>
  );
}

export default {
  name: "noodl.editor-js.editor",
  displayName: "Editor.js",
  category: "ui",
  getReactComponent() {
    return Component;
  },
  initialize() {
    this.internal = {};
    this.props.eventHandler = new EventTarget();
  },
  inputs: {
    onFocus: {
      type: "signal",
      displayName: "Focus",
      valueChangedToTrue() {
        this.props.eventHandler.dispatchEvent(new Event("focus"));
      },
    },
    onClear: {
      type: "signal",
      displayName: "Clear",
      valueChangedToTrue() {
        this.props.eventHandler.dispatchEvent(new Event("clear"));
      },
    },
  },
  inputProps: {
    value: {
      type: "object",
      displayName: "Data",
      displayName: "Value",
      group: "General",
    },
    readOnly: {
      type: "boolean",
      displayName: "Read Only",
      default: false,
      group: "General",
    },
    autofocus: {
      type: {
        name: "boolean",
        allowEditOnly: true,
      },
      displayName: "Auto Focus",
      default: true,
      group: "General",
    },
    placeholder: {
      type: {
        name: "string",
        allowEditOnly: true,
      },
      displayName: "Placeholder",
      group: "General",
    },
    hideToolbar: {
      type: {
        name: "boolean",
        allowEditOnly: true,
      },
      displayName: "Hide Toolbar",
      group: "General",
    },
    scriptSetup: {
      type: {
        name: "string",
        codeeditor: "javascript",
      },
      displayName: "Setup",
      group: "Script",
      default: DEFAULT_SETUP_SCRIPT,
    },
    tool_paragraph_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Paragraph",
      default: true,
      group: "Tools",
    },
    tool_header_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Header",
      default: true,
      group: "Tools",
    },
    tool_quote_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Quote",
      default: true,
      group: "Tools",
    },
    tool_warning_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Warning",
      default: true,
      group: "Tools",
    },
    tool_delimiter_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Delimiter",
      default: true,
      group: "Tools",
    },
    tool_list_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable List",
      default: true,
      group: "Tools",
    },
    tool_checklist_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Checklist",
      default: true,
      group: "Tools",
    },
    tool_image_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Image",
      default: true,
      group: "Tools",
    },
    tool_linkTool_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Link Tool",
      default: true,
      group: "Tools",
    },
    tool_attaches_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Attaches",
      default: true,
      group: "Tools",
    },
    tool_table_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Table",
      default: true,
      group: "Tools",
    },
    tool_code_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Code",
      default: true,
      group: "Tools",
    },
    tool_raw_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Raw",
      default: true,
      group: "Tools",
    },
    tool_marker_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Marker",
      default: true,
      group: "Tools",
    },
    tool_inlineCode_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable ",
      default: true,
      group: "Tools",
    },
    tool_link_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Link",
      default: true,
      group: "Tools",
    },
    tool_underline_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Underline",
      default: true,
      group: "Tools",
    },
    tool_textVariant_enabled: {
      type: { name: "boolean", allowEditOnly: true },
      displayName: "Enable Text Variant",
      default: true,
      group: "Tools",
    },
    logLevel: {
      type: {
        name: "enum",
        enums: [
          {
            label: "Verbose",
            value: "VERBOSE",
          },
          {
            label: "Info",
            value: "INFO",
          },
          {
            label: "Warnings",
            value: "WARN",
          },
          {
            label: "Error",
            value: "ERROR",
          },
        ],
        allowEditOnly: true,
      },
      default: "ERROR",
      displayName: "Log Level",
      group: "Debug",
    },
  },
  outputProps: {
    outValue: {
      type: "object",
      displayName: "Value",
      group: "Data",
    },
    outChanged: {
      type: "signal",
      displayName: "Changed",
      group: "Events",
    },
    outReady: {
      type: "signal",
      displayName: "Ready",
      group: "Events",
    },
  },
};
