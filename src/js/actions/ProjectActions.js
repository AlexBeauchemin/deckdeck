var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');

var ProjectActions = {

  /**
   * @param  {string} name
   */
  create: function(name) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_CREATE,
      name: name
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_DESTROY,
      id: id
    });
  }
};

module.exports = ProjectActions;