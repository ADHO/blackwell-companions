let idx;
let results;

// Load the pre-built index
const getIndex = fetch("data/idx.json")
  .then((response) => response.json())
  .then((json) => (idx = lunr.Index.load(json)));

getIndex.then(() => {
  const searchButton = document.querySelector("#do-search");
  searchButton.disabled = false;
  searchButton.innerText = "Search!";
});

const highlightInNode = (
  node,
  word,
  regexp = new RegExp(
    `\\b${word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`,
    "ig",
  ),
) => {
  if (node.nodeType == 3 && node.data.match(regexp)) {
    node.replaceWith(
      document
        .createRange()
        .createContextualFragment(node.data.replace(regexp, "<mark>$&</mark>")),
    );
  }
  if (node.nodeType == 1) {
    node.childNodes.forEach((childNode) =>
      highlightInNode(childNode, word, regexp),
    );
  }
};

const unMarkupArticle = () => {
  [...document.querySelectorAll("main mark")].forEach((mark) => {
    const parent = mark.parentNode;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
  });
};

const markupArticle = (result) => {
  for (let [term, metadata] of Object.entries(result.matchData.metadata)) {
    metadata.text.originalWord
      .sort((word) => word.length)
      .forEach((word) => {
        highlightInNode(document.querySelector("main"), word);
      });
  }
  document.querySelector("main mark").scrollIntoView();
};

const clearSearchResults = () => {
  document.getElementById("match-counts").innerHTML = "";
  [...document.querySelectorAll(`nav a[href^="DH_html/"]`)].forEach((link) => {
    link.closest("tr").firstElementChild.innerHTML = "";
  });
  unMarkupArticle();
};

const doSearch = (/* event */) => {
  clearSearchResults();
  const query = document.querySelector("#query").value;
  results = idx.search(query);

  let totalHitCount = 0;
  results.forEach((result) => {
    if (
      `DH_html/${result.ref}` ==
      document.querySelector("main").getAttribute("data-current-chapter")
    ) {
      markupArticle(result);
    }

    const hitCount = Object.values(result.matchData.metadata).reduce(
      (acc, termMeta) => acc + termMeta.text.hitCount[0],
      0,
    );

    const link = document.querySelector(`nav a[href="DH_html/${result.ref}"]`);
    link.closest(
      "tr",
    ).firstElementChild.innerHTML = `<span class="hit-count">${hitCount}</span>`;

    totalHitCount += hitCount;
  });

  document.getElementById(
    "match-counts",
  ).innerHTML = `Found <mark>${totalHitCount}</mark> matches for “<mark>${query}</mark>” in <mark>${results.length}</mark> documents.`;
};

document.querySelector("#do-search").addEventListener("click", doSearch);
document.querySelector("#search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") doSearch();
});

window.addEventListener("articleLoaded", ({ detail: chapter_href }) => {
  if (!results) return;
  const result = results.find(
    (result) => `DH_html/${result.ref}` == chapter_href,
  );
  if (result) markupArticle(result);
});
