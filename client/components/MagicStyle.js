import style from 'react-style';

let styles = {
  App: {
    color: '#aaa',
    backgroundColor: 'black',

    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 400,
    fontSize: '2em',
    lineHeight: '1.5em',
    WebkitFontSmoothing: 'antialiased'
  },
  Header: {
    textTransform: 'uppercase',
    fontSize: '15px',
    fontFamily: 'Roboto Condensed',
    fontWeight: 400,
    borderBottom: '1px solid #666',
    lineHeight: '15px',
    paddingBottom: '5px',
    marginBottom: '10px',
    color: '#999'
  }
}

let defaults = {
  dimmed: {
    color: '#666'
  },
  normal: {
    color: '#999'
  },
  bright: {
    color: '#fff'
  },

  xsmall: {
    fontSize: '15px',
    lineHeight: '25px'
  },
  small: {
    fontSize: '20px',
    lineHeight: '25px'
  },
  medium: {
    fontSize: '30px',
    lineHeight: '35px'
  },
  large: {
    fontSize: '65px',
    lineHeight: '65px'
  },
  xlarge: {
    fontSize: '75px',
    lineHeight: '75px',
    letterSpacing: '-3px'
  },

  thin: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 100
  },
  light: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 300
  },
  regular: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 400
  },
  bold: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 700
  },

  alginRight: {
    textAlgin: 'right'
  },
  alginLeft: {
    textAlgin: 'left'
  }
}

Object.keys(styles).map(i => styles[i] = style.create(styles[i]))
Object.keys(defaults).map(i => defaults[i] = style.create(defaults[i]))
Object.assign(styles, {default: defaults})
module.exports = styles;
