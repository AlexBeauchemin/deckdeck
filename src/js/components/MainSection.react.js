var React = require('react');
var ReactPropTypes = React.PropTypes;
var CopyDeckItem = require('./CopyDeckItem.react');
var CopyDeckAdd = require('./CopyDeckAdd.react');

var MainSection = React.createClass({

  propTypes: {
    selectedProject: ReactPropTypes.object,
    copyDeck: ReactPropTypes.object
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
              <table id="project-data" className="bordered stripped responsive">
                <thead>
                  <tr>
                    <th>Key</th>
                    {tableHeaders}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {copyDeck}
                </tbody>
              </table>
              <CopyDeckAdd project={this.props.selectedProject} />
            </div>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = MainSection;
