# A Companion to Digital Humanities

<a href="https://app.netlify.com/sites/distracted-banach-2ed882/deploys"><img src="https://api.netlify.com/api/v1/badges/957c205d-5a3b-4b3b-9293-23607c822765/deploy-status" align="right" alt="Netlify Status"></a>
https://distracted-banach-2ed882.netlify.app/

This is a prototype / proof-of-concept / initial version (depending!) of a conversion of the Companion to Digital Humanities XTF installation at http://digitalhumanities.org/companion/

The site is entirely static, and as such it has (imho) a number of advantages over the XTF-based site. XTF is heavy and burdensome to support -- it requires a Java-based Tomcat server and significant server resources and represents a substantial technical debt. This seems excessive for a site that presents fixed content with a very limited search function. An entirely static site like this requires almost zero infrastructure resources (indeed, it can easily be hosted for free on, e.g., GitHub Pages or Netlify, as with this demo), requires no maintenance and exposes no security concerns.

For a (only slightly unfair) point of comparison, the XTF installation that currently serves up the two Companions is currently consuming about half a gigabyte of RAM and about 5Gb of storage space. Something like this requires essentially zero RAM, and less than 20mb of storage for each Companion.

The search functionality included here is slightly more sophisticated than the current offering (XTF could, presumably, be configured to do the same, but the existing installation has only very limited search capabilities).

Note that doing the same for the Companion to Digital Literary Studies should be a case of dropping in the content and changing a few constants.

## TODO for full feature-parity:

- **Implement a "print view"**  
  Does this need to be an actual button that displays the "print view", or just some `@media print` styles...?
- Add in the "Corrections to John Unsworth" link?
- Add in the "Buy the book" link? (Note that this doesn't actually work, so presumably a new link would have to be found.)
- This site doesn't use the chapter headers and footers with the prev / next navigation buttons (I don't much like them, personally) -- should they be added back in?
- Likewise the prev/next search hit UI -- might be a nice-to-have?

### Nice-to-haves / Improvements

- pre-generate pages for SEO and progressive-enhancement purposes

  - the TOC, at least, should probably be hardcoded
  - a build system for stamping out templating will be needed
  - this will result in better URLs, and make a fall-back search functionality easier
  - switching the DOM order of the TOC and the article would improved SEO / accessibility

- redevelop some of the markup / css?

  - the markup is awful (seriously -- I've stripped the tables around the chapter content, but take a look at the TOC...)
  - the CSS for the text is just copied from the XTF-based site. Nicer typography might be nice.
  - a (more) responsive, mobile-friendly layout would be nice, too.

- depending on network latency, there can be a bit of a lag on loading a new chapter -- some immediate feedback (e.g. a spinner or something) would improve UX (this has been mitigated substantially by applying the "current link" styling before loading the page, but more could be done).

- as it stands this will not work on Internet Explorer (MS Edge should be fine). Support _could_ be added, but I would argue against unless a compelling case could be made, tbh.
