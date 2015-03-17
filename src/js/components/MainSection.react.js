var React = require('react');
var ReactPropTypes = React.PropTypes;
var CopyDeckItem = require('./CopyDeckItem.react');
var CopyDeckAdd = require('./CopyDeckAdd.react');

var MainSection = React.createClass({

  propTypes: {
    selectedProject: ReactPropTypes.object,
    copyDeck: ReactPropTypes.object,
    onDestroyProject: ReactPropTypes.func.isRequired
  },

  componentDidUpdate: function() {
    $('ul.tabs').tabs();
  },

  getInitialState: function() {
    return {
      displayClass: "all"
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
      tableHeaders = [];

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
        />
      );
    }

    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2>{this.props.selectedProject.name}</h2>

              <ul className="tabs z-depth-1">
                <li className="tab col s3"><a href="#" onClick={this.tabClick} data-display-class="all" className="active" >All</a></li>
                <li className="tab col s3"><a href="#" onClick={this.tabClick} data-display-class="new">New</a></li>
                <li className="tab col s3"><a href="#" onClick={this.tabClick} data-display-class="modified">Modified</a></li>
                <li className="tab col s3"><a href="#" onClick={this.tabClick} data-display-class="done">Done</a></li>
              </ul>

              <table id="project-data" className="stripped responsive">
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
  }
});

module.exports = MainSection;
