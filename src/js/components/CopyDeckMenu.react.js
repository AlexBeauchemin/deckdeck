var React = require('react');
var ReactPropTypes = React.PropTypes;

var CopyDeckMenu = React.createClass({
  propTypes: {
    tabClick: ReactPropTypes.func.isRequired
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    $('main ul.tabs').tabs();
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <ul className="tabs z-depth-1">
        <li className="tab col s3"><a href="#" onClick={this.props.tabClick} data-display-class="all" className="active" >All</a></li>
        <li className="tab col s3"><a href="#" onClick={this.props.tabClick} data-display-class="new">New</a></li>
        <li className="tab col s3"><a href="#" onClick={this.props.tabClick} data-display-class="modified">Modified</a></li>
        <li className="tab col s3"><a href="#" onClick={this.props.tabClick} data-display-class="done">Done</a></li>
      </ul>
    );
  }
});

module.exports = CopyDeckMenu;
