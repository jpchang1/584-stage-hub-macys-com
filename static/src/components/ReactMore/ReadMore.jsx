import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import Interactive from "react-interactive";
 
class ReadMore extends Component {
    constructor(...args) {
        super(...args);
 
        this.state = {
            expanded: false,
            truncated: false
        };
 
        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }
 
    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
 
    toggleLines(event) {
        event.preventDefault();
 
        this.setState({
            expanded: !this.state.expanded
        });
    }
 
    render() {
        const {
            children,
            more,
            less,
            lines 
        } = this.props;
 
        const {
            expanded,
            truncated 
        } = this.state;
 
        return (
            <div className="tvp-video-description">
                <Truncate
                    lines={!expanded && lines}
                    trimWhitespace={true}
                    onTruncate={this.handleTruncate}
                >
                    {children}
                </Truncate>
                <div className="tvp-show-more text-center">
                {!truncated && expanded && (
                    <Interactive as="button" className="clamp-lines__button" normal={{className:"tvp-normal"}} hover={{className:"tvp-hovered"}} touchActive={{className:"tvp-hovered"}} onClick={this.toggleLines}>{less}</Interactive>
                )}
                {truncated && !expanded && (
                    <Interactive as="button" className="clamp-lines__button" normal={{className:"tvp-normal"}} hover={{className:"tvp-hovered"}} touchActive={{className:"tvp-hovered"}} onClick={this.toggleLines}>{more}</Interactive>
                )}
                </div>
            </div>
        );
    }
}
 
ReadMore.defaultProps = {
    lines: 3,
    more: 'Show More',
    less: 'Show Less'
};
 
ReadMore.propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number,
    less: PropTypes.string,
    more: PropTypes.string
};
 
export default ReadMore;