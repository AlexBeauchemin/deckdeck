var React = require('react');
var ReactPropTypes = React.PropTypes;

var jsdiff = require('diff');

var CopyDeckItemDiff = React.createClass({

  propTypes: {
    id: ReactPropTypes.string,
    previousVal: ReactPropTypes.string,
    isVisible: ReactPropTypes.bool
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var diff,
      diffText = [],
      val = this.props.children,
      previousVal = this.props.previousVal;

    if (!this.props.isVisible) return null;

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
      <div key={this.props.id} className="diff-text">{diffText}</div>
    );
  }
});

module.exports = CopyDeckItemDiff;
