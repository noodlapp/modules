const Noodl = require("@noodl/noodl-sdk");
const TableNode = require('./nodes/table');
const TableBodyNode = require('./nodes/table-body');
const TableCellNode = require('./nodes/table-cell');
const TableHeadNode = require('./nodes/table-head');
const TableRowNode = require('./nodes/table-row');

Noodl.defineModule({
  reactNodes: [
    TableNode,
    TableHeadNode,
    TableBodyNode,
    TableRowNode,
    TableCellNode,
  ],
  nodes: [],
  setup() {},
});
