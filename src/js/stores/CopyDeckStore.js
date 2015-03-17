var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CopyDeckConstants = require('../constants/CopyDeckConstants');
var assign = require('object-assign');
var firebaseConnection = require('../firebaseConnection');

var CHANGE_EVENT = 'change';

var _copyDeck = {},
  firebaseCopyDeck = null;

function create(key) {
  if (!firebaseCopyDeck) return;

  firebaseCopyDeck.push({
    state: "new",
    key: key,
    copy: {},
    info: ""
  });
}

function update(id, updates) {
  if (!firebaseCopyDeck) return;

  firebaseCopyDeck.child(id).update(updates);
}

function done(id) {
  if (!firebaseCopyDeck || !_copyDeck[id]) return;

  //Set previous value (for compare)
  $.each(_copyDeck[id].copy, function(lang, copy) {
    _copyDeck[id].copy[lang].previousVal = copy.val;
  });

  firebaseCopyDeck.child(id).update({
    state: "done",
    copy: _copyDeck[id].copy
  });
}

function destroy(id) {
  if (!firebaseCopyDeck) return;

  delete _copyDeck[id];
  firebaseCopyDeck.child(id).remove();
}

/**
 * Delete all the completed TODO items.
 */
/*function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}*/

var CopyDeckStore = assign({}, EventEmitter.prototype, {
  setProject: function(id) {
    var _this = this;

    if (firebaseCopyDeck) {
      firebaseCopyDeck.off('value');
    }

    firebaseCopyDeck = firebaseConnection.child('copydeck/' + id);

    firebaseCopyDeck.on("value", function(copyDeck) {
      copyDeck = copyDeck.val();

      _copyDeck = {};

      if (copyDeck) {
        $.each(copyDeck, function(key, copy) {
          _copyDeck[key] = copy;
        });
      }

      _this.emitChange();
    });
  },

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  /*areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },*/

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _copyDeck;
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
  var key;

  switch(action.actionType) {
    case CopyDeckConstants.COPY_CREATE:
      key = action.key.trim();

      if (key) create(key);

      CopyDeckStore.emitChange();
      break;
    case CopyDeckConstants.COPY_UPDATE:
      update(action.id, action.values);

      CopyDeckStore.emitChange();
      break;
    case CopyDeckConstants.COPY_DESTROY:
      destroy(action.id);

      CopyDeckStore.emitChange();
      break;
    case CopyDeckConstants.COPY_DONE:
      done(action.id);

      CopyDeckStore.emitChange();
      break;
    /*case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;
    */
    default:
      // no op
  }
});

module.exports = CopyDeckStore;
