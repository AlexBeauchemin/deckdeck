var React = require('react');
var CopyDeckActions = require('../actions/CopyDeckActions');

var ENTER_KEY_CODE = 13;

var ModalNewCopy = React.createClass({

  getInitialState: function() {
    return {
      val: ''
    }
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div id="addCopy" className="modal">
        <div className="modal-content">
          <h4>Create copy</h4>
          <div className="input-field">
            <input
              id="new-copy"
              name="new-copy"
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={this.state.val}
              type="text"
            />
            <label htmlFor="new-copy">New copy key</label>
          </div>
        </div>
        <div className="modal-footer right-align">
          <a href="#" onClick={this._addCopy} className="waves-effect waves-green btn-flat modal-action modal-close">Create</a>
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Cancel</a>
        </div>
      </div>
    );
  },


  _addCopy: function() {
    var copyKey = this.state.val;
    if (copyKey.trim()){
      CopyDeckActions.create(copyKey);
      this.setState({
        val: ''
      });
    }
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      val: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._addCopy();
    }
  }

});

module.exports = ModalNewCopy;
