'use strict';

var projects = [];

function Project (projectsListObj) {
  this.title = projectsListObj.title;
  this.url = projectsListObj.url;
  this.githubURL = projectsListObj.githubURL;
  this.img = projectsListObj.img;
  this.skillsUsed = projectsListObj.skillsUsed;
}

Project.prototype.toHtml = function() {
  var sourceHTML = $('#project-template').html();
  var actualTemplate = Handlebars.compile(sourceHTML);
  var newRawHTML = actualTemplate(this);
  return newRawHTML;
};

Project.loadAll = function (projectsList) {
  projectsList.forEach((projectObject) => {
    projects.push(new Project(projectObject));
  });
};

Project.initIndexPage = function() {
  projects.forEach((project) => {
    $('.projectsAnchor').append(project.toHtml());
  });
};

$('#hamburgerMenu').on('click', function(event) {
  event.preventDefault();
  $('.navTab').toggle('fast');
});

Project.fetchAll = function() {
  if (localStorage.projectsList) {
    Project.loadAll(JSON.parse(localStorage.projectsList));
    Project.initIndexPage();
  } else {
    $.get('/data/projects.json', ((response) => {
      localStorage.setItem('projectsList', JSON.stringify(response));
      Project.loadAll(response);
      Project.initIndexPage();
    })
    );
  }
};
