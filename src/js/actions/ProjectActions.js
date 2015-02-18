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
  }
};

module.exports = ProjectActions;
