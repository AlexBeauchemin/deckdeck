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
      inputs = [],
      labelClass = "";

    languages.forEach(function(language) {
      var inputName = copy.key + '-' + language,
        className = "materialize-textarea " + _this.state.values[language].state;

      if (_this.state.values[language].val) labelClass = "active";

      inputs.push(
        <td key={inputName}>
          <div className="input-field">
            <textarea
              value={_this.state.values[language].val}
              name={inputName}
              className={className}
              onChange={_this._onChange}
              data-id={_this.props.copyKey}
              data-lang={language}
            />
            <label htmlFor="{inputName}" className={labelClass}>{language}</label>
          </div>
        </td>
      );
    });

    return (
      <tr className={copy.state}>
        <td></td>
        <td>{copy.key}</td>
        {inputs}
        <td className="right-align">
          <a href="#editInfo" className="modal-trigger"><i className="small mdi-action-info-outline light-blue-text text-lighten-1"></i></a>
          <a href="#" onClick={this._onDone} className="action-done"><i className="small mdi-action-done green-text"></i></a>
          <a href="#" onClick={this._onDestroy} className="action-clear"><i className="small mdi-content-clear red-text"></i></a>
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
    item.state = "modified";

    console.log(this.state);

    CopyDeckActions.update(this.props.copyKey, item);
  },

  _onDestroy: function() {
    CopyDeckActions.destroy(this.props.copyKey);
  },

  _onDone: function() {
    CopyDeckActions.done(this.props.copyKey);
  }
});

module.exports = CopyDeckItem;
