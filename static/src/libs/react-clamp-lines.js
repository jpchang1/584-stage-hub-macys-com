import React, { Component } from 'react';
import Interactive from "react-interactive";

export default class ClampLines extends Component {
  constructor(props) {
    super(props);

    this.element = null;
    this.original = props.text;
    this.watch = true;
    this.lineHeight = 0;
    this.start = 0;
    this.middle = 0;
    this.end = 0;
    this.state = {
      noClamp: false,
      text: "."
    };

    this.action = this.action.bind(this);
    this.clickHandler = this.clickHandler.bind(this);

    this.debounced = this.debounce(this.action, props.delay);
  }
  componentDidMount() {
    if (this.props.text) {
      this.lineHeight = this.element.clientHeight + 1;
      this.clampLines();

      if (this.watch) {
        window.addEventListener('resize', this.debounced);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounced);
    this.action = null;
    this.clickHandler = null;
  }
  shouldComponentUpdate(nextProps,nextState){
    if(this.original !== nextProps.text && this.element){
      this.original = nextProps.text;
      this.setState({
        text: "."
      });
      this.lineHeight = this.element.clientHeight + 1;
      this.debounced();
    }
    return true;
  }
  debounce(func, wait, immediate) {
    let timeout;

    return () => {
      let context = this, args = arguments;
      let later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  action() {
    if (this.watch) {
      this.setState({ noClamp: false });
      this.clampLines();
    }
  }

  clampLines() {
    this.setState({ text: '' });

    let maxHeight = this.lineHeight * this.props.lines + 1;
    this.start = 0;
    this.middle = 0;
    this.end = this.original.length;

    while (this.start <= this.end) {
      this.middle = Math.floor((this.start + this.end) / 2);
      this.element.innerText = this.original.slice(0, this.middle);
      if (this.middle === this.original.length) {
        this.setState({
          text: this.original,
          noClamp: true,
        });
        return;
      }

      this.moveMarkers(maxHeight);
    }

    this.element.innerText = this.original.slice(0, this.middle - 5) + this.getEllipsis();
    this.setState({ text: this.original.slice(0, this.middle - 5) + this.getEllipsis() });
  }

  moveMarkers(maxHeight) {
    if (this.element.clientHeight <= maxHeight) {
      this.start = this.middle + 1;
    } else {
      this.end = this.middle - 1;
    }
  }

  getClassName() {
    let className = this.props.className || '';

    return `clamp-lines ${className}`;
  }

  getEllipsis() {
    return this.watch && !this.state.noClamp ? this.props.ellipsis : '';
  }

  getButton() {
    if (this.state.noClamp || !this.props.buttons) return;

    let buttonText = this.watch ? this.props.moreText : this.props.lessText;

    return (
      <div className="tvp-show-more text-center">
      <button className="clamp-lines__button" onClick={this.clickHandler}>
        {buttonText}
      </button>
      </div>
    );
  }

  clickHandler(e) {
    e.preventDefault();

    this.watch = !this.watch;
    this.watch ? this.clampLines() : this.setState({ text: this.original });
  }

  render() {
    if (!this.props.text) {
      return null;
    }
    let buttonText = this.watch ? this.props.moreText : this.props.lessText;
    return (
      <div className={this.getClassName()}>
        <div ref={e => { this.element = e; }}>
            {this.state.text}
        </div>
        { (!this.state.noClamp) &&
          <div className="tvp-show-more text-center">
          <Interactive as="button" className="clamp-lines__button" normal={{className:"tvp-normal"}} hover={{className:"tvp-hovered"}} touchActive={{className:"tvp-hovered"}} onClick={this.clickHandler}>
            {buttonText}
          </Interactive>
          </div>
        }
      </div>
    );
  }
}

ClampLines.defaultProps = {
  buttons: true,
  lines: 3,
  delay: 300,
  ellipsis: '...',
  moreText: 'Read more',
  lessText: 'Read less'
};
