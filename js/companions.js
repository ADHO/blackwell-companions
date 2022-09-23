const loadPage = (filePath, targetElem = document.querySelector("main")) => {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) throw new Error(response.text);
      return response;
    })
    .then((file) =>
      file.text().then((textContent) => {
        // update relative image paths before appending to the DOM
        const contentElem = document.createElement("template");
        contentElem.innerHTML = textContent;
        const contentFrag = contentElem.content;
        for (let img of contentFrag.querySelectorAll(".content img")) {
          if (
            img.parentElement.tagName == "A" &&
            img.parentElement.href == img.src
          ) {
            img.parentElement.href = `content/${img.getAttribute("src")}`;
          }
          img.src = `content/${img.getAttribute("src")}`;
        }
        targetElem.innerHTML = "";
        targetElem.appendChild(contentFrag);
      }),
    )
    .catch(() => {
      const div = document.createElement("div");
      div.classList.add("content");
      div.innerHTML =
        "The section you have requested cannot be found; please check your URL, or use the chapter links in the sidebar.";
      targetElem.innerHTML = "";
      targetElem.appendChild(div);
    });
};

window.addEventListener("articleWillLoad", ({ detail: chapter_href }) => {
  document.querySelector("nav a.current")?.classList.remove("current");
  document
    .querySelector(`nav a[href="${chapter_href}"]`)
    .classList.add("current");
});

window.addEventListener("articleLoaded", ({ detail: chapter_href }) => {
  document
    .querySelector("main")
    .setAttribute("data-current-chapter", chapter_href);
  document.querySelector("main").scrollTop = 0;
});

if (window.innerWidth <= 768)
  document.getElementById("open-sidebar").checked = false;

const urlParams = new URLSearchParams(window.location.search);
const chapter = urlParams.get("chapter");
if (chapter)
  document.querySelector("main include").setAttribute("src", chapter);

const includes = document.getElementsByTagName("include");
Promise.all(
  [...includes].map((include) =>
    loadPage(include.getAttribute("src"), include.parentElement),
  ),
).then(() => {
  for (let link of document.querySelectorAll("nav a[href^='content/']")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.innerWidth <= 768)
        document.getElementById("open-sidebar").checked = false;
      const href = link.getAttribute("href");
      window.dispatchEvent(
        new CustomEvent("articleWillLoad", { detail: href }),
      );
      loadPage(href).then(() => {
        window.dispatchEvent(
          new CustomEvent("articleLoaded", { detail: href }),
        );
        urlParams.set("chapter", href);
        window.history.replaceState(
          {},
          "",
          `${location.pathname}?chapter=${urlParams.get("chapter")}`,
        );
      });
    });
  }
  if (chapter) {
    window.dispatchEvent(
      new CustomEvent("articleWillLoad", { detail: chapter }),
    );
    window.dispatchEvent(new CustomEvent("articleLoaded", { detail: chapter }));
  }
});
