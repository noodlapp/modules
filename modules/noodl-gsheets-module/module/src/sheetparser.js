class PublicGoogleSheetsParser {
    constructor (spreadsheetId, sheetName,query) {
      this.id = spreadsheetId
      this.sheetName = sheetName
      this.query = query
    }
  
    getSpreadsheetDataUsingFetch () {
      // Read data from the first sheet of the target document.
      // It cannot be used unless everyone has been given read permission.
      // It must be a spreadsheet document with a header, as in the example document below.
      // spreadsheet document for example: https://docs.google.com/spreadsheets/d/10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps/edit#gid=1719755213
      if (!this.id) return null
      let url = `https://docs.google.com/spreadsheets/d/${this.id}/gviz/tq?`
      if (this.sheetName) {
        url = url.concat(`sheet=${this.sheetName}`)
      }
      if (this.query) {
        url = url.concat(`&tq=${encodeURIComponent(this.query)}`)
      }
      url = url + '&headers=1'

      return fetch(url)
        .then((r) => r && r.ok && r.text ? r.text() : null)
        .catch(/* istanbul ignore next */(_) => null)
    }
  
    normalizeRow (rows) {
      return rows.map((row) => (row && (row.v !== null && row.v !== undefined)) ? row : {})
    }
  
    applyHeaderIntoRows (header, rows) {
      return rows
        .map(({ c: row }) => this.normalizeRow(row))
        .map((row) => row.reduce((p, c, i) => (c.v !== undefined) ? Object.assign(p, { [header[i]]: c.v }) : p, {}))
    }
  
    getItems (spreadsheetResponse) {
      let rows = []
      let cols = []
  
      try {
        const parsedJSON = JSON.parse(spreadsheetResponse.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''))
        cols = parsedJSON.table.cols
        const hasSomeLabelPropertyInCols = parsedJSON.table.cols.some(({ label }) => !!label)
        if (hasSomeLabelPropertyInCols) {
          const header = parsedJSON.table.cols.map(({ label }) => label)
  
          rows = this.applyHeaderIntoRows(header, parsedJSON.table.rows)
        } else {
          const [headerRow, ...originalRows] = parsedJSON.table.rows
          const header = this.normalizeRow(headerRow.c).map((row) => row.v)
  
          rows = this.applyHeaderIntoRows(header, originalRows)
        }
      } catch (e) {}
  
      return {rows,cols}
    }
  
    async parse (spreadsheetId, sheetName,query) {
      if (spreadsheetId) this.id = spreadsheetId
      if (sheetName) this.sheetName = sheetName
      if (query) this.query = query
  
      if (!this.id) throw new Error('SpreadsheetId is required.')
  
      const spreadsheetResponse = await this.getSpreadsheetDataUsingFetch()
  
      if (spreadsheetResponse === null) return []
  
      return this.getItems(spreadsheetResponse)
    }
  }

  module.exports = PublicGoogleSheetsParser