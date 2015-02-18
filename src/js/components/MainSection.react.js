var React = require('react');
var ReactPropTypes = React.PropTypes;

var CopyDeckStore = require('../stores/CopyDeckStore');

var MainSection = React.createClass({

  propTypes: {
    selectedProject: ReactPropTypes.object
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
    // This section should be hidden by default
    // and shown when there are todos.

    /*if (Object.keys(this.props.allCopy).length < 1) {
      return null;
    }

    var allCopy = this.props.allCopy;
    var copyDeck = [];

    for (var key in allCopy) {
      copyDeck.push(<CopyDeckItem key={key} copy={allCopy[key]} />);
    }*/

    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s12">

              <table id="project-data" className="bordered stripped responsive">
                <thead>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = MainSection;
