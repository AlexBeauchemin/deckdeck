var React = require('react');
var ReactPropTypes = React.PropTypes;

var ProjectStore = require('../stores/ProjectStore');
var ProjectActions = require('../actions/ProjectActions');

var TextInput = require('./TextInput.react');
var Button = require('./Button.react');
var ProjectItem = require('./ProjectItem.react');

function getStateFromStore() {
  return {
    projectList: ProjectStore.getAll()
  }
}

var Header = React.createClass({
  propTypes: {
    selectedProject: ReactPropTypes.object,
    onChangeProject: ReactPropTypes.func
  },

  getInitialState: function() {
    var state = getStateFromStore();
    state.newProjectName = '';

    return state;
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);

    // Materialize binds
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var projects = [],
      project,
      selectedProjectName = "",
      componentDestroyProject = null;

    if (this.props.selectedProject) {
      selectedProjectName = this.props.selectedProject.name;
      componentDestroyProject = <a href="#" onClick={this._onDestroy}><i className="small mdi-content-clear"></i></a>;
    }

    for (var index in this.state.projectList) {
      project = this.state.projectList[index];

      projects.push(
        <ProjectItem
          key={index}
          id={index}
          name={project.name}
          changeProject={this._onChangeProject}
          selectedProject={this.props.selectedProject}
        />
      );
    }

    return (
      <header>
        <nav className="top-nav light-blue lighten-1" role="navigation">
          <div className="container">
            <div className="nav-wrapper">
              {selectedProjectName}
              <a href="#" data-activates="nav-mobile" className="button-collapse top-nav"><i className="mdi-navigation-menu"></i></a>
              {componentDestroyProject}
            </div>
          </div>
        </nav>

        <ul id="nav-mobile" className="side-nav fixed">
          <li className="logo">
            <a id="logo-container" href="#" className="brand-logo blue-text text-lighten-1">DeckDeck</a>
          </li>
          <li className="add-project">
            <TextInput
              id="new-project"
              placeholder="Create new project"
              onChange={this._onChangeProjectName}
              onSave={this._onSave}
              value={this.state.newProjectName}
            />
            <Button
              className="btn waves-effect waves-light light-blue lighten-1"
              onClick={this._onSave}
              value="Add project"
            />
          </li>
          {projects}
        </ul>
      </header>
    );
  },

  _onSave: function() {
    var name = this.state.newProjectName;
    if (name.trim()){
      ProjectActions.create(name);
      this.setState({
        newProjectName: ''
      });
    }
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  _onChangeProject: function(id) {
    this.props.onChangeProject(id);
  },

  _onChangeProjectName: function(name) {
    this.setState({
      newProjectName: name
    });
  },

  _onDestroy: function() {
    ProjectActions.destroy(this.props.selectedProject.id);
    this.props.onChangeProject(null);
  }

});

module.exports = Header;
