var React = require('react');
var ReactPropTypes = React.PropTypes;

var CopyDeckActions = require('../actions/CopyDeckActions');
var CopyDeckItemDiff = require('./CopyDeckItemDiff.react');

var CopyDeckItem = React.createClass({

  propTypes: {
    copyItem: ReactPropTypes.object.isRequired,
    copyKey: ReactPropTypes.string.isRequired,
    project: ReactPropTypes.object.isRequired,
    diffVisible: ReactPropTypes.bool
  },

  getInitialState: function() {
    return {
      values: this.props.copyItem.copy
    }
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var _this = this,
      copy = this.props.copyItem,
      values = this.state.values,
      languages = this.props.project.languages,
      inputs = [],
      labelClass = "";

    languages.forEach(function(language) {
      var inputName = copy.key + '-' + language,
        previousVal = "",
        emptyClass = "";

      if (!values) values = {};
      if (!values[language]) values[language] = {val: ""};
      if (values[language].val) labelClass = "active";

      if (copy.copy && copy.copy[language]) previousVal = copy.copy[language].previousVal;

      if(values[language].val === "") emptyClass = "edit";

      inputs.push(
        <td key={inputName} className={emptyClass}>
          <div className="clean-value" onClick={_this._onEdit}>{values[language].val}</div>
          <div className="input-field">
            <textarea
              value={values[language].val}
              name={inputName}
              className="materialize-textarea"
              onChange={_this._onChange}
              data-id={_this.props.copyKey}
              data-lang={language}
              onBlur={_this._onCloseEdit}
            />
            <label htmlFor="{inputName}" className={labelClass}>{language}</label>
          </div>
          <CopyDeckItemDiff
            key={inputName}
            id={inputName}
            previousVal={previousVal}
            isVisible={_this.props.diffVisible}
          >{values[language].val}</CopyDeckItemDiff>
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
      values = this.props.copyItem.copy,
      lang = $el.data('lang'),
      item = this.props.copyItem;

    if (!values) values = {};
    if (!values[lang]) values[lang] = {val: ""};

    values[lang].val = event.target.value;

    this.setState({
      values: values
    });

    item.copy = values;
    item.state = "modified";

    CopyDeckActions.update(this.props.copyKey, item);
  },

  _onDestroy: function() {
    CopyDeckActions.destroy(this.props.copyKey);
  },

  _onDone: function() {
    CopyDeckActions.done(this.props.copyKey);
  },

  _onEdit: function(e) {
    $(e.target).parents('td').addClass('edit').find('textarea').focus();
  },

  _onCloseEdit: function(e) {
    var $textarea = $(e.target);

    if (!$textarea.val()) return;

    $textarea.parents('td').removeClass('edit');
  }
});

module.exports = CopyDeckItem;
