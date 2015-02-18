var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TextInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    onChange: ReactPropTypes.func,
    value: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <input
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.props.value}
        type="text"
      />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onSave();
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    var val = event.target.value;
    this.props.onChange(val);
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = TextInput;
