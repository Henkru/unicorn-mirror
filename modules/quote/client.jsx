import React from 'react';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

export default class Quote extends UnicornComponent {
  static defaultProps = {
  }

  state = {
    currentQuote: '',
    author: '',
  }

  componentDidMount() {
    this.changeQuote();
    setInterval(() => this.changeQuote(), 2 * 1 * 1000);
  }

  changeQuote() {
    const quotes = this.props.settings.quotes;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    this.setState({ currentQuote: quote.quote, author: quote.author });
  }

  render() {
    const authorStyle = Object.assign({}, MS.default.light, MS.default.bright, MS.default.small, MS.default.alignCenter);
    const quoteStyle = Object.assign({ fontStyle: 'italic', marginBottom: 0 }, MS.default.alignCenter, MS.default.small);

    return (
      <div>
        <p style={quoteStyle}>{ this.state.currentQuote }</p>
        <p style={authorStyle}>- { this.state.author }</p>
      </div>
    );
  }
}
