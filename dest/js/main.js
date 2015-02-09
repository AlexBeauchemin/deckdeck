(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible
  $('.collapsible').collapsible();

  var firebase = new Firebase("https://incandescent-fire-2676.firebaseio.com"),
    firebaseProjects = firebase.child('projects'),
    firebaseProject = null,
    firebaseKeys = firebase.child('copy'),
    firebaseProjectKeys = null,
    languages = ['en', 'fr'],
    $projectList = $('#project-list'),
    $projectData = $('#project-data tbody'),
    $projectHead = $('#project-data thead');


  firebaseProjects.on("value", function(projects) {
    $projectList.empty();
    $.each(projects.val(), function(key, project) {
      $projectList.append('<li><a href="#" data-action="load-project" data-id="' + key + '">' + project.name + '</a></li>');
    });
  });

  $('[data-action="add-project"]').on('click', function() {
    var name = $('input[name="name"]').val(),
      newProject = firebaseProjects.push({
        name: name,
        languages: [
          'en',
          'fr'
        ]}),
      projectId = newProject.key(),
      data = {};

    data[projectId] = {
      "text1": {
        en: "text 1 [en]",
        fr: "text 1 [fr]"
      }
    };

    languages = ['en', 'fr'];
    firebaseKeys.set(data);
  });

  $projectList.on('click', '[data-action="load-project"]', function(e) {
    e.preventDefault();
    var projectId = $(this).attr('data-id');

    if (firebaseProjectKeys) firebaseProjectKeys.off('value');
    if (firebaseProject) firebaseProject.off('value');

    firebaseProject = firebase.child('projects/' + projectId);
    firebaseProject.on("value", function(project) {
      languages = project.val().languages;

      var headHtml = "<tr><th>Key</th>";
      languages.forEach(function(lang, index) {
        headHtml += "<th>" + lang + "</th>";
      });

      headHtml += "<th></th>";
      $projectHead.html(headHtml);
    });

    firebaseProjectKeys = firebase.child('copy/' + projectId);
    firebaseProjectKeys.on("value", function(copyDeck) {
      $projectData.empty();
      $.each(copyDeck.val(), function(key, copy) {
        var html =
          '<tr>' +
            '<td>' + key + '</td>';

        $.each(languages, function(index, lang) {
          html += '<td><input type="text" name="' + key + '-' + lang + '" value="' + copy[lang] +'" /></td>';
        });

        html += '<td>Ok</td></tr>';

        $projectData.append(html);
      });
      $projectData.append(
        '<tr>' +
          '<td><input type="text" name="key" placeholder="New key"/></td>' +
          '<td><input type="text" name="value-en" placeholder="Value (en)" /></td>' +
          '<td><input type="text" name="value-fr" placeholder="Value (fr)" /></td>' +
          '<td><a href="#" data-action="add-key" class="btn waves-effect waves-light light-blue">Add</a></td>' +
        '</tr>'
      );
    });
  });
})();

},{}]},{},[1]);
