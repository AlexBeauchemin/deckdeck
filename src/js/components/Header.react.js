var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var ProjectStore = require('../stores/ProjectStore');

var ModalNewProject = require('./ModalNewProject.react');
var ModalDeleteProject = require('./ModalDeleteProject.react');
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
    //$('.collapsible').collapsible();
    $('.modal-trigger').leanModal({
      ready: function(e) {
        $('#project-name').focus();
      }
    });
    $('.dropdown-button').dropdown({
      constrain_width: false,
      hover: false,
      alignment: 'right',
      belowOrigin: false
    });

    // https://groups.google.com/forum/#!topic/reactjs/mHfBGI3Qwz4
  },

  componentDidUpdate: function() {

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
      cx = React.addons.classSet;

    var dropDownClasses = cx({
      'modal-trigger': true,
      'hidden': this.props.selectedProject ? true : false
    });

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
        <div className="navbar-fixed">
          <nav className="light-blue lighten-1" role="navigation">
            <ul className="left">
              <li>
                <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="mdi-navigation-menu"></i></a>
              </li>
              <li className="logo">
                <a href="#" className="brand-logo">DeckDeck</a>
              </li>
            </ul>

            <ul className="right">
              <li id="nav-dropdown">
                <a href="#" className="dropdown-button" data-activates="nav-dropdown-actions"><i className="mdi-navigation-more-vert"></i></a>
                <ul id="nav-dropdown-actions" className='dropdown-content'>
                  <li><a className="modal-trigger" href="#newProject">New project</a></li>
                  <li><a className="modal-trigger" href="#deleteProject">Delete project</a></li>
                </ul>
              </li>
            </ul>

            <ul id="slide-out" className="side-nav fixed">
              {projects}
            </ul>
          </nav>
        </div>

        <ModalDeleteProject
          project={this.props.selectedProject}
          onDestroyProject={this.props.onChangeProject}
        />

        <ModalNewProject />
      </header>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  _onChangeProject: function(id) {
    var _this = this;

    $('.button-collapse').sideNav('hide');

    setTimeout(function() {
      _this.props.onChangeProject(id);
    },300);
  }
});

module.exports = Header;
