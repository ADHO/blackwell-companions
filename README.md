# A Companion to Digital Humanities
<a href="https://app.netlify.com/sites/distracted-banach-2ed882/deploys"><img src="https://api.netlify.com/api/v1/badges/957c205d-5a3b-4b3b-9293-23607c822765/deploy-status" align="right" alt="Netlify Status"></a>
https://distracted-banach-2ed882.netlify.app/

This is a prototype / proof-of-concept / initial version (depending!) of a conversion of the Companion to Digital Humanities XTF installation at http://digitalhumanities.org/companion/

The site is entirely static, and as such it has (imho) a number of advantages over the XTF-based site.  XTF is heavy and burdensome to support -- it requires a Java-based Tomcat server and significant server resources and represents a significant technical debt.  This seems excessive for a static site with a very limited search function.  An entirely static site like this requires almost zero infrastructure resources (indeed, it can easily be hosted for free on, e.g., GitHub Pages or Netlify, as with this demo), requires no maintenance and exposes no security concerns.

Note that doing the same for the Companion to Digital Literary Studies should be a case of dropping in the content and changing a few constants.


## TODO:
* Implement search functionality
  The XTF-based search function (as implemented) is very limited anyway -- replicating it should be easy.
* Implement a "print view"

### Nice-to-haves / Improvements
* pre-generate pages for SEO and progressive-enhancement purposes
  * the TOC, at least, should probably be hardcoded
  * a build system for stamping out templating will be needed
  * this will result in better URLs, and make a fall-back search functionality easier
  * note to self -- switch the DOM order of the TOC and the article

* redevelop some of the markup / css?
  * the markup is awful (seriously -- I've stripped the tables around the chapter content, but take a look at the TOC...)
  * the CSS for the text is just copied from the XTF-based site.  Nicer typography might be nice.
  * a (more) responsive, mobile-friendly layout would be nice, too.
