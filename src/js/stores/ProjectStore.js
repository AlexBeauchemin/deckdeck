var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProjectConstants = require('../constants/ProjectConstants');
var assign = require('object-assign');
var firebaseConnection = require('../firebaseConnection');

var CHANGE_EVENT = 'change';

var firebaseProjects = firebaseConnection.child('projects');
var _projects = {};
var _defaultProject = null;

firebaseProjects.on("value", function(projects) {
  projects = projects.val();

  if (!projects) {
    _projects = {};
  }
  else {
    $.each(projects, function(key, project) {
      if (!_defaultProject) {
        _defaultProject = {
          id: key,
          data: project
        };
      }
      _projects[key] = project;
    });
  }

  ProjectStore.emitChange();
});


function create(name) {
  var newProject = firebaseProjects.push({
    name: name,
    languages: [
      'en',
      'fr'
    ]});
  var projectId = newProject.key();

  //TODO: Use CopyDeckStore setProject + add functions instead
  var firebaseCopyDeck = firebaseConnection.child('copydeck/' + projectId);

  firebaseCopyDeck.push({
    state: "new",
    key: "text1",
    copy: {
      en: "text 1 [en]",
      fr: "text 1 [fr]"
    }
  });
}

function destroy(id) {
  firebaseProjects.child(id).remove();
  delete _projects[id];

  ProjectStore.emitChange();

  //TODO: Use CopyDeckStore setProject + destroyAll functions instead
  firebaseConnection.child('copydeck/' + id).remove();
}

var ProjectStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of projects.
   * @return {object}
   */
  getAll: function() {
    return _projects;
  },

  /**
   * Get a specific project.
   * @return {object}
   */
  getProject: function(id) {
    return $.extend(_projects[id],{
      id: id
    });
  },

  /**
   * Get the first project (default on page load)
   * @return {object}
   */
  getDefault: function() {
    return _defaultProject;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var name;

  switch(action.actionType) {
    case ProjectConstants.PROJECT_CREATE:
      name = action.name.trim();
      if (name !== '') {
        create(name);
      }
      ProjectStore.emitChange();
      break;
    case ProjectConstants.PROJECT_DESTROY:
      destroy(action.id);
      ProjectStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = ProjectStore;
