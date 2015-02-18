(function () {
  'use strict';

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible
  $('.collapsible').collapsible();

  var firebase = new Firebase("https://incandescent-fire-2676.firebaseio.com"),
    firebaseProjects = firebase.child('projects'),
    firebaseProject = null,
    firebaseKeys = null,
    languages = ['en', 'fr'],
    $nav = $('#nav-mobile'),
    $projectData = $('#project-data tbody'),
    $projectHead = $('#project-data thead');


  firebaseProjects.on("value", function(projects) {
    projects = projects.val();
    $nav.find('.project').remove();

    if (!projects || !projects.length) return;

    $.each(projects, function(key, project) {
      $nav.append('<li class="project"><a href="#" data-action="load-project" data-id="' + key + '">' + project.name + '</a></li>');
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
      projectId = newProject.key();

    languages = ['en', 'fr'];
    firebaseKeys = firebase.child('copy/' + projectId);
    firebaseKeys.push({
      state: "new",
      key: "text1",
      data: {
        en: "text 1 [en]",
        fr: "text 1 [fr]"
      }
    });
  });

 $nav.on('click', '[data-action="load-project"]', function(e) {
    e.preventDefault();
    var projectId = $(this).attr('data-id');

    if (firebaseKeys) firebaseKeys.off('value');
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

    firebaseKeys = firebase.child('copy/' + projectId);
    firebaseKeys.on("value", function(copyDeck) {
      $projectData.empty();

      if (copyDeck && copyDeck.val() && !copyDeck.val().length) {
        $.each(copyDeck.val(), function (key, copy) {
          var html =
            '<tr class="' + copy.state + '">' +
            '<td>' + copy.key + '</td>';

          $.each(languages, function (index, lang) {
            html += '<td><input type="text" name="' + key + '-' + lang + '" value="' + copy.data[lang] + '" /></td>';
          });

          html += '<td>Ok</td></tr>';

          $projectData.append(html);
        });
      }

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
