const blocks = {
  App: {
    color: '#aaa',
    backgroundColor: 'black',

    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 400,
    fontSize: '1em',
    lineHeight: '1.2em',
    WebkitFontSmoothing: 'antialiased',

    margin: 0,
    padding: 0,
  },
  Header: {
    textTransform: 'uppercase',
    fontSize: '2em',
    fontFamily: 'Roboto Condensed',
    fontWeight: 400,
    borderBottom: '1px solid #666',
    lineHeight: '1em',
    paddingBottom: '5px',
    marginBottom: '10px',
    color: '#999',
  },
};

const defaults = {
  dimmed: {
    color: '#666',
  },
  normal: {
    color: '#999',
  },
  bright: {
    color: '#fff',
  },

  xsmall: {
    fontSize: '15px',
    lineHeight: '25px',
  },
  small: {
    fontSize: '20px',
    lineHeight: '25px',
  },
  medium: {
    fontSize: '30px',
    lineHeight: '35px',
  },
  large: {
    fontSize: '65px',
    lineHeight: '65px',
  },
  xlarge: {
    fontSize: '75px',
    lineHeight: '75px',
    letterSpacing: '-3px',
  },

  thin: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 100,
  },
  light: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 300,
  },
  regular: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 400,
  },
  bold: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 700,
  },

  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignCenter: {
    textAlign: 'center',
  },
};

const styles = Object.assign({}, blocks, { default: defaults });

export default styles;
