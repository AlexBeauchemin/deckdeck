var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var ProjectStore = require('../stores/ProjectStore');

var App = React.createClass({

  getInitialState: function() {
    return {
      selectedProject: null
    }
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
      <Header
        selectedProject={this.state.selectedProject}
        onChangeProject={this._onChangeProject}
      />
      <MainSection
        selectedProject={this.state.selectedProject}
      />
      </div>
  	);
  },

  _onChangeProject: function(id) {
    this.setState({
      selectedProject: ProjectStore.getProject(id)
    })
  }

});

module.exports = App;
