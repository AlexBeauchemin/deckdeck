var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProjectActions = require('../actions/ProjectActions');

var ModalDeleteProject = React.createClass({

  propTypes: {
    project: ReactPropTypes.object,
    onDestroyProject: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div id="deleteProject" className="modal">
        <div className="modal-content">
          <h4>Delete Project</h4>
          <p>Do you relly want to delete this project? This action cannot be undone.</p>
        </div>
        <div className="modal-footer right-align">
          <a href="#" onClick={this._destroyProject} className="waves-effect waves-green btn-flat modal-action modal-close">Delete</a>
          <a href="#" className="waves-effect waves-green btn-flat modal-action modal-close">Cancel</a>
        </div>
      </div>
    );
  },

  _destroyProject: function() {
    if (!this.props.project) return;

    ProjectActions.destroy(this.props.project.id);
    this.props.onDestroyProject();
  }

});

module.exports = ModalDeleteProject;
