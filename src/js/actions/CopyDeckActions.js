var AppDispatcher = require('../dispatcher/AppDispatcher');
var CopyDeckConstants = require('../constants/CopyDeckConstants');

var CopyDeckActions = {

  /**
   * @param  {string} name
   */
  create: function(key) {
    AppDispatcher.dispatch({
      actionType: CopyDeckConstants.COPY_CREATE,
      key: key
    });
  }
};

module.exports = CopyDeckActions;
