var React = require('react');

var ModalNewCopy = require('./ModalNewCopy.react');

var CopyDeckAdd = React.createClass({

  componentDidMount: function() {
    $('.modal-trigger').leanModal();
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div>
        <div className="copydeck-actions">
          <a className="modal-trigger" href="#addCopy">
            <i className="medium mdi-content-add-circle light-blue-text text-lighten-1 waves-effect waves-light waves-circle"></i>
          </a>
        </div>

        <ModalNewCopy />
      </div>
    );
  }
});

module.exports = CopyDeckAdd;
