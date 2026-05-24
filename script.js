(function () {
  'use strict';

  // === Render content into DOM ===

  // Nav
  document.querySelector('.nav-brand').textContent = siteData.nav.brand;

  // Hero
  document.querySelector('.hero-name').textContent = siteData.hero.name;
  document.querySelector('.hero-title').textContent = siteData.hero.title;
  document.querySelector('.hero-tagline').textContent = siteData.hero.tagline;

  // About
  document.querySelector('.about-bio').textContent = siteData.about.bio;

  var interestsList = document.querySelector('.interests-list');
  siteData.about.interests.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item;
    interestsList.appendChild(li);
  });

  var educationList = document.querySelector('.education-list');
  siteData.about.education.forEach(function (edu) {
    var li = document.createElement('li');
    li.textContent = edu.degree + ' — ' + edu.school + '（' + edu.year + '）';
    educationList.appendChild(li);
  });

  // Papers
  var papersList = document.querySelector('.papers-list');
  siteData.papers.forEach(function (paper) {
    var card = document.createElement('div');
    card.className = 'paper-card';
    card.innerHTML =
      '<div class="paper-title">' + escapeHTML(paper.title) + '</div>' +
      '<div class="paper-meta">' + escapeHTML(paper.journal) + ' &middot; ' + paper.year + '</div>' +
      (paper.doi ? '<a class="paper-link" href="' + escapeHTML(paper.doi) + '" target="_blank" rel="noopener">DOI: ' + escapeHTML(paper.doi) + '</a>' : '');
    papersList.appendChild(card);
  });

  // Projects
  var projectsList = document.querySelector('.projects-list');
  if (siteData.projects && siteData.projects.length > 0) {
    siteData.projects.forEach(function (proj) {
      var card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML =
        '<h4>' + escapeHTML(proj.name) + '</h4>' +
        '<p>' + escapeHTML(proj.description) + '</p>' +
        (proj.link ? '<a href="' + escapeHTML(proj.link) + '" target="_blank" rel="noopener">了解更多</a>' : '');
      projectsList.appendChild(card);
    });
  } else {
    document.querySelector('.projects-heading').style.display = 'none';
  }

  // Contact
  var emailLink = document.createElement('a');
  emailLink.href = 'mailto:' + siteData.contact.email;
  emailLink.textContent = siteData.contact.email;
  document.querySelector('.contact-email').appendChild(emailLink);

  var linksContainer = document.querySelector('.contact-links');
  var linkLabels = {
    scholar: 'Google Scholar',
    researchgate: 'ResearchGate',
    orcid: 'ORCID'
  };
  Object.keys(linkLabels).forEach(function (key) {
    if (siteData.contact[key]) {
      var a = document.createElement('a');
      a.href = siteData.contact[key];
      a.textContent = linkLabels[key];
      a.target = '_blank';
      a.rel = 'noopener';
      linksContainer.appendChild(a);
    }
  });

  // Footer
  document.querySelector('.copyright').textContent = siteData.footer.copyright;

  // Page title
  document.title = siteData.hero.name + ' — ' + siteData.hero.title;

  // === Utility ===
  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // === Navigation active state ===
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
