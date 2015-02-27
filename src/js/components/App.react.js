var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var ProjectStore = require('../stores/ProjectStore');
var CopyDeckStore = require('../stores/CopyDeckStore');

function getStateFromStore() {
  return {
    copyDeck: CopyDeckStore.getAll()
  }
}

var App = React.createClass({

  getInitialState: function() {
    return {
      selectedProject: null,
      copyDeck: {}
    }
  },

  componentDidMount: function() {
    CopyDeckStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CopyDeckStore.removeChangeListener(this._onChange);
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
        copyDeck={this.state.copyDeck}
      />
      </div>
  	);
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  _onChangeProject: function(id) {
    if (!id) {
      this.setState({
        selectedProject: null
      });
      return;
    }

    this.setState({
      selectedProject: ProjectStore.getProject(id)
    });

    CopyDeckStore.setProject(id);
  }

});

module.exports = App;
