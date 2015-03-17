var React = require('react');
var ReactPropTypes = React.PropTypes;

var jsdiff = require('diff');

var CopyDeckItemDiff = React.createClass({

  propTypes: {
    val: ReactPropTypes.string,
    previousVal: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var diff,
      diffText = [],
      val = this.props.val,
      previousVal = this.props.previousVal;

    if (typeof previousVal == "undefined") return null;
    if (previousVal.localeCompare(val) === 0) return null;

    diff = jsdiff.diffChars(previousVal, val);

    diff.forEach(function(part){
      var diffClass = "";

      if (part.added) diffClass = "blue lighten-4 added";
      if (part.removed) diffClass = "red lighten-4 removed";

      diffText.push(<span className={diffClass}>{part.value}</span>);
    });

    return (
      <div className="diff-text">{diffText}</div>
    );
  }
});

module.exports = CopyDeckItemDiff;
