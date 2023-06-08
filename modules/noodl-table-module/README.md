# noodl-table-module
*Simple table module for Noodl*

> This is replaced by the Table Prefab. https://docs.noodl.net/2.8/library/prefabs/table/

This module adds new nodes that corresponds to table, thead, tbody, tr and th/td. Use the CSS node to style the table specific elements.

Note: You need to use this css in a Css node in order to get correct sizing of child nodes and table rows.
```
th > div, td > div {
    position: static !important;
}
```
