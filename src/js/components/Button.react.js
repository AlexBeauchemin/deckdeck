var React = require('react');
var ReactPropTypes = React.PropTypes;

var Button = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    onClick: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <button
        className={this.props.className}
        onClick={this.props.onClick}
      >{this.props.value}</button>
    );
  }
});

module.exports = Button;
