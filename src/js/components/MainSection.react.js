var React = require('react');
var ReactPropTypes = React.PropTypes;
var CopyDeckItem = require('./CopyDeckItem.react');
var CopyDeckAdd = require('./CopyDeckAdd.react');
var CopyDeckMenu = require('./CopyDeckMenu.react');

var MainSection = React.createClass({

  propTypes: {
    selectedProject: ReactPropTypes.object,
    copyDeck: ReactPropTypes.object,
    onDestroyProject: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    var diffVisible = localStorage.getItem('diffVisible');

    diffVisible = !!(diffVisible === true || diffVisible === "true");

    return {
      diffVisible: diffVisible,
      displayClass: "all",
      visibilityClass: "mdi-action-visibility-off"
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    //if (Object.keys(this.props.copyDeck).length < 1) {
    //  return null;
    //}
    if (!this.props.selectedProject) return null;

    var _copyDeck = this.props.copyDeck,
      _project = this.props.selectedProject,
      copyDeck = [],
      tableHeaders = [],
      iconClass = "light-blue-text text-lighten-1 " + this.state.visibilityClass;

    _project.languages.forEach(function(language) {
      tableHeaders.push(<th key={language}>{language}</th>);
    });

    for (var key in _copyDeck) {
      copyDeck.push(
        <CopyDeckItem
          key={key}
          copyItem={_copyDeck[key]}
          copyKey={key}
          project={this.props.selectedProject}
          diffVisible={this.state.diffVisible}
        />
      );
    }

    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h4>
                {this.props.selectedProject.name}
                <a href="#" className="right" onClick={this._toggleDiff} title="Show diff for modified items">
                  <i className={iconClass}></i>
                </a>
              </h4>

              <CopyDeckMenu tabClick={this.tabClick}/>

              <table id="project-data" className="striped responsive">
                <thead>
                  <tr>
                    <th></th>
                    <th>Key</th>
                    {tableHeaders}
                    <th></th>
                  </tr>
                </thead>
                <tbody className={this.state.displayClass}>
                {copyDeck}
                </tbody>
              </table>
            </div>
          </div>
          <CopyDeckAdd />
        </div>
      </main>
    );
  },

  tabClick: function(e) {
    this.setState({
      displayClass: $(e.target).data('display-class')
    });
  },

  _toggleDiff: function() {
    var visibilityClass = "mdi-action-visibility";

    if (this.state.visibilityClass == "mdi-action-visibility") visibilityClass = "mdi-action-visibility-off";

    localStorage.setItem('diffVisible', !this.state.diffVisible);

    this.setState({
      diffVisible: !this.state.diffVisible,
      visibilityClass: visibilityClass
    });
  }
});

module.exports = MainSection;
