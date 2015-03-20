var React = require('react');

var ModalNewCopy = require('./ModalNewCopy.react');

var CopyDeckAdd = React.createClass({

  componentDidMount: function() {
    $('.modal-trigger').leanModal({
      ready: function(e) {
        $('#new-copy').focus();
      }
    });
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div>
        <div className="copydeck-add">
          <a className="btn-round modal-trigger" href="#addCopy">
            <i className="small mdi-content-add light-blue lighten-1 z-depth-1 btn-round white-text"></i>
          </a>
        </div>

        <ModalNewCopy />
      </div>
    );
  }
});

module.exports = CopyDeckAdd;
