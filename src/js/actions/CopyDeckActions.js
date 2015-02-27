var AppDispatcher = require('../dispatcher/AppDispatcher');
var CopyDeckConstants = require('../constants/CopyDeckConstants');

var CopyDeckActions = {

  /**
   * @param  {string}  key
   */
  create: function(key) {
    AppDispatcher.dispatch({
      actionType: CopyDeckConstants.COPY_CREATE,
      key: key
    });
  },

  /**
   * @param  {string}  id
   * @param  {object}  values
   */
  update: function(id, values) {
    AppDispatcher.dispatch({
      actionType: CopyDeckConstants.COPY_UPDATE,
      values: values,
      id: id
    });
  },

  /**
   * @param  {string}  id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: CopyDeckConstants.COPY_DESTROY,
      id: id
    });
  }
};

module.exports = CopyDeckActions;
