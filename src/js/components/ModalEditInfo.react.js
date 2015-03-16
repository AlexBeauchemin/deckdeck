var React = require('react');
var CopyDeckActions = require('../actions/CopyDeckActions');

var ENTER_KEY_CODE = 13;

var ModalEditInfo = React.createClass({

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
      <div id="editInfo" className="modal">
        <div className="modal-content">
          <h4>Info</h4>
          <div className="input-field">
            <input
              id="item-info"
              name="item-info"
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={this.state.val}
              type="text"
            />
            <label htmlFor="item-info">Element information</label>
          </div>
        </div>
        <div className="modal-footer right-align">
          <a href="#" onClick={this._editInfo} className="waves-effect waves-green btn-flat modal-action modal-close">Create</a>
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Cancel</a>
        </div>
      </div>
    );
  },


  _editInfo: function() {
    var info = this.state.val;
    CopyDeckActions.update(id, {
      info: info
    });
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
      this._editInfo();
    }
  }

});

module.exports = ModalEditInfo;
