var React = require('react');
var ProjectActions = require('../actions/ProjectActions');

var ENTER_KEY_CODE = 13;

var ModalNewProject = React.createClass({

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
      <div id="newProject" className="modal">
        <div className="modal-content">
          <h4>Create New Project</h4>
          <div className="input-field">
            <label htmlFor="project-name">Project name</label>
              <input
                id="project-name"
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                value={this.state.val}
                type="text"
              />
          </div>
        </div>
        <div className="modal-footer right-align">
          <a href="#" onClick={this._createProject} className="waves-effect waves-green btn-flat modal-action modal-close">Create</a>
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Cancel</a>
        </div>
      </div>
    );
  },


  _createProject: function() {
    var name = this.state.val;
    if (name.trim()){
      ProjectActions.create(name);
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
      this._createProject();
    }
  }

});

module.exports = ModalNewProject;
