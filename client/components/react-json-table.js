// Forked from https://github.com/arqex/react-json-table

let React = require('react');

let $ = React.DOM;

// Some shared attrs for JsonTable and JsonRow
let defaultSettings = {
  header: true,
  noRowsMessage: 'No items',
  classPrefix: 'json'
},
  getSetting = function (name) {
    let settings = this.props.settings;

    if (!settings || typeof settings[name] == 'undefined')
      return defaultSettings[name];

    return settings[name];
  }
  ;

let JsonTable = React.createClass({
  getSetting: getSetting,

  render: function () {
    let cols = this.normalizeColumns(),
      contents = [this.renderRows(cols)]
      ;

    if (this.getSetting('header'))
      contents.unshift(this.renderHeader(cols));

    let tableClass = this.props.className || this.getSetting('classPrefix') + 'Table';

    return $.table({ className: tableClass, style: this.props.style }, contents);
  },

  renderHeader: function (cols) {
    let me = this,
      prefix = this.getSetting('classPrefix'),
      headerClass = this.getSetting('headerClass'),
      cells = cols.map(function (col) {
        let className = prefix + 'Column';
        if (headerClass)
          className = headerClass(className, col.key);

        return $.th(
          { className: className, key: col.key, onClick: me.onClickHeader, "data-key": col.key },
          col.label
        );
      })
      ;

    return $.thead({ key: 'th' },
      $.tr({ className: prefix + 'Header' }, cells)
    );
  },

  renderRows: function (cols) {
    let me = this,
      items = this.props.rows,
      settings = this.props.settings || {},
      i = 1
      ;

    if (!items || !items.length)
      return $.tbody({ key: 'body' }, [$.tr({ key: 'row' }, $.td({ key: 'column' }, this.getSetting('noRowsMessage')))]);

    let rows = items.map(function (item) {
      let key = me.getKey(item, i);
      return React.createElement(Row, {
        key: key,
        reactKey: key,
        item: item,
        settings: settings,
        columns: cols,
        opacity: 1 - 0.8 * i / items.length,
        i: i++,
        onClickRow: me.onClickRow,
        onClickCell: me.onClickCell
      });
    });

    return $.tbody({ key: 'body' }, rows);
  },

  getItemField: function (item, field) {
    return item[field];
  },

  normalizeColumns: function () {
    let getItemField = this.props.cellRenderer || this.getItemField,
      cols = this.props.columns,
      items = this.props.rows
      ;

    if (!cols) {
      if (!items || !items.length)
        return [];

      return Object.keys(items[0]).map(function (key) {
        return { key: key, label: key, cell: getItemField };
      });
    }

    return cols.map(function (col) {
      let key;
      if (typeof col == 'string') {
        return {
          key: col,
          label: col,
          cell: getItemField
        };
      }

      if (typeof col == 'object') {
        key = col.key || col.label;

        // This is about get default column definition
        // we use label as key if not defined
        // we use key as label if not defined
        // we use getItemField as cell function if not defined
        return {
          key: key,
          label: col.label || key,
          cell: col.cell || getItemField,
          align: col.align || ""
        };
      }

      return {
        key: 'unknown',
        name: 'unknown',
        cell: 'Unknown'
      };
    });
  },

  getKey: function (item, i) {
    let field = this.props.settings && this.props.settings.keyField;
    if (field && item[field])
      return item[field];

    if (item.id)
      return item.id;

    if (item._id)
      return item._id;

    return i;
  },

  shouldComponentUpdate: function () {
    return true;
  },

  onClickRow: function (e, item) {
    if (this.props.onClickRow) {
      this.props.onClickRow(e, item);
    }
  },

  onClickHeader: function (e) {
    if (this.props.onClickHeader) {
      this.props.onClickHeader(e, e.target.dataset.key);
    }
  },

  onClickCell: function (e, key, item) {
    if (this.props.onClickCell) {
      this.props.onClickCell(e, key, item);
    }
  }
});

let Row = React.createClass({
  getSetting: getSetting,

  render: function () {
    let me = this,
      props = this.props,
      cellClass = this.getSetting('cellClass'),
      rowClass = this.getSetting('rowClass'),
      prefix = this.getSetting('classPrefix'),
      cells = props.columns.map(function (col) {
        let content = col.cell,
          key = col.key,
          className = prefix + 'Cell ' + prefix + 'Cell_' + key
          ;

        if (cellClass)
          className = cellClass(className, key, props.item);

        if (typeof content == 'function')
          content = content(props.item, key);

        return $.td({
          className: className,
          key: key,
          "data-key": key,
          onClick: me.onClickCell
        }, content);
      })
      ;

    let className = prefix + 'Row ' + prefix +
      (props.i % 2 ? 'Odd' : 'Even')
      ;

    if (props.reactKey)
      className += ' ' + prefix + 'Row_' + props.reactKey;

    if (rowClass)
      className = rowClass(className, props.item);

    return $.tr({
      className: className,
      onClick: me.onClickRow,
      key: this.props.reactKey,
      style: { opacity: this.props.opacity }
    }, cells);
  },

  onClickCell: function (e) {
    this.props.onClickCell(e, e.target.dataset.key, this.props.item);
  },

  onClickRow: function (e) {
    this.props.onClickRow(e, this.props.item);
  }
});

module.exports = JsonTable;