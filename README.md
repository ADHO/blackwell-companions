# A Companion to Digital Humanities

<https://companions.digitalhumanities.org/>

The content here is a conversion of the Companion to Digital Humanities XTF installation formerly available at <http://digitalhumanities.org/companion/>.  The content has been extracted from XTF and rebuilt as a static site with a very minimal hand-rolled Javascript SPA framework.  The intention was to recreate the interface and functionality offered by the XTF site (warts and all) in the most direct and unembellished fashion possible.  There is a client-side full-text search functionality which is slightly more sophisticated than the previous offering (XTF could, presumably, have been configured to do the same, but the previous site had only very limited search capabilities).

The primary motivation for the conversion was to reduce the maintenance, security, and resource requirements of hosting what is ultimately static content.


## Development

Further development is not expected or advised.  However, should something need to be changed, the following notes may be useful.

* The content is essentially as output by the old XTF site, and only very minimally edited (hence all the tables and so on).
* The `bin/` folder contains two scripts:
  * `make_json.py` will parse the content of the folder specified by the `--content-path` argument and outputs the text content of the HTML files in JSON format where the keys are the filenames and the values are the text content.
  * `build_idx.js` takes this JSON data on `stdin` and builds the `lunr.js` search indexes found at `DH/idx.json` and `DLS/idx.json`.
  * e.g.

    ```
    bin/make_json.py --content-path DH/content | bin/build_idx.js > DH/idx.json
    ```

  * Unless the content changes for some reason (?) there should be no need to rebuild the indexes at any time; however, should the need arise, note that the version of `lunr.js` that is used to build the index must match the version served by the front-end from `js/lunr.min.js` (currently `2.3.9`).

* The CSS in `css/` is committed here in the repo for ease of deployment; however, it is generated from the files in `scss/`, and any edits should be made there and the CSS recompiled, e.g.

  ```
  npx node-sass --output-style compressed --omit-source-map-url scss/styles.scss > css/styles.css;
  npx node-sass --output-style compressed --omit-source-map-url scss/index.scss > css/index.css;
  ```

* There is a substantial amount of `nginx` config on the server that hosts `digitalhumanities.org` which takes care of redirecting the various tangled URLs and routing from the XTF site to the new locations.  See the server deployment README for full details.

