var React = require('react');
var ReactPropTypes = React.PropTypes;

var CopyDeckActions = require('../actions/CopyDeckActions');

var CopyDeckItem = React.createClass({

  propTypes: {
    project: ReactPropTypes.object.isRequired,
    copyItem: ReactPropTypes.object.isRequired,
    copyKey: ReactPropTypes.string.isRequired
  },

  getInitialState: function() {
    var _this = this,
      languages = this.props.project.languages,
      values = {};

    languages.forEach(function(language) {
      if (_this.props.copyItem.copy && _this.props.copyItem.copy.hasOwnProperty(language)) {
        values[language] = _this.props.copyItem.copy[language]
      }
      else {
        values[language] = {
          state: "new",
          value: ""
        };
      }
    });

    return {
      values: values
    }
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var _this = this,
      copy = this.props.copyItem,
      languages = this.props.project.languages,
      inputs = [];

    languages.forEach(function(language) {
      var inputName = copy.key + '-' + language,
        className = "materialize-textarea " + _this.state.values[language].state;

      inputs.push(
        <td key={inputName}>
          <textarea
            value={_this.state.values[language].value}
            name={inputName}
            className={className}
            onChange={_this._onChange}
            data-id={_this.props.copyKey}
            data-lang={language}
          />
        </td>
      );
    });

    return (
      <tr className={copy.state}>
        <td>{copy.key}</td>
        {inputs}
        <td>
          <i className="small mdi-action-info-outline light-blue-text text-lighten-1"></i>
          <a href="#" onClick={this._onDestroy}><i className="small mdi-content-clear red-text"></i></a>
        </td>
      </tr>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    var $el = $(event.target),
      values = this.state.values,
      lang = $el.data('lang');

    values[lang] = {
      state: "modified",
      val: event.target.value
    };

    this.setState({
      values: values
    });

    var item = this.props.copyItem;
    item.copy = values;

    CopyDeckActions.update(this.props.copyKey, item);
  },

  /**
   * @param {object} event
   */
  _onDestroy: function(/*object*/ event) {
    CopyDeckActions.destroy(this.props.copyKey);
  }
});

module.exports = CopyDeckItem;
