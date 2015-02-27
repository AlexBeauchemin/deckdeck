var React = require('react');
var ReactPropTypes = React.PropTypes;

var CopyDeckActions = require('../actions/CopyDeckActions');

var CopyDeckAdd = React.createClass({

  propTypes: {
    project: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      newCopyKey: ''
    }
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div className="copy-add">
        <input
          type="text"
          name="new-copy"
          value={this.state.newCopyKey}
          placeholder="New copy key"
          onChange={this._onChange}
        />
        <a href="#" onClick={this._addCopy}>
          <i className="medium mdi-content-add-circle light-blue-text text-lighten-1"></i>
        </a>
      </div>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      newCopyKey: event.target.value
    })
  },

  _addCopy: function() {
    CopyDeckActions.create(this.state.newCopyKey);
  }
});

module.exports = CopyDeckAdd;
