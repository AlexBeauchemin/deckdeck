var React = require('react');
var ReactPropTypes = React.PropTypes;

var ProjectItem = React.createClass({

  propTypes: {
    id: ReactPropTypes.string.isRequired,
    name: ReactPropTypes.string.isRequired,
    changeProject: ReactPropTypes.func,
    selectedProject: ReactPropTypes.object
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var className = "waves-effect waves-light";
    if (this.props.selectedProject && this.props.selectedProject.id === this.props.id) {
      className = "waves-effect waves-light active";
    }

    return (
      <li className={className}>
        <a href="#"  onClick={this._changeProject}>
          {this.props.name}
        </a>
      </li>
    );
  },

  _changeProject: function() {
    this.props.changeProject(this.props.id);
  }
});

module.exports = ProjectItem;
