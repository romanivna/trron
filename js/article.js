let articleArrObj;

fetch("./jsons/articles.json")
  .then(response => response.json())
  .then(data => {
    articleArrObj = data;
    makeArticle();
  });

function makeArticle() {
  let searchableIDOfObject = +window.location.search.slice(1);
  if (
    searchableIDOfObject > articleArrObj.articles.length ||
    isNaN(searchableIDOfObject)
  ) {
    searchableIDOfObject = 0;
  }
  const articleObj = articleArrObj.articles.filter(
    item => item.id === searchableIDOfObject
  );

  const articleContent = document.querySelector(".article-content");
  const image = document.createElement("img");
  image.setAttribute("src", articleObj[0].image);
  image.setAttribute("alt", articleObj[0].title);
  image.setAttribute("class", "article-content-image");

  const title = document.createElement("p");
  title.setAttribute("class", "article-content-title");
  title.innerText = articleObj[0].title;

  const text = document.createElement("p");
  text.setAttribute("class", "article-content-text");
  text.innerText = articleObj[0].text;

  articleContent.appendChild(image);
  articleContent.appendChild(title);
  articleContent.appendChild(text);
}