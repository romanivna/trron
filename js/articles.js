fetch('jsons/articles.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    const articlesCounter = data["articles"].length;
    const firstArticle = Math.floor(Math.random() * articlesCounter);
    const secondArticle = Math.floor(Math.random() * articlesCounter);
    const thirdArticle= Math.floor(Math.random() * articlesCounter);

    const width = screen.width;
    const articles = document.getElementsByClassName("articles")[0];
      bildArticle(firstArticle);
      bildArticle(secondArticle);
      bildArticle(thirdArticle);
    function bildArticle(articleIndex ){
      let articlesContainer = document.createElement("div");
      articlesContainer.classList.add("articles-container");

      let imgLink = document.createElement("a");
      imgLink.href = "articles.html?"+data["articles"][articleIndex ].id;

      let articlesImgContainer = document.createElement("div");
      articlesImgContainer.classList.add("articles-img-container");

      let img = document.createElement("img");
      img.classList.add("articles-img");
      img.src = data["articles"][articleIndex].image ;
      img.title = data["articles"][articleIndex].title;
      articlesImgContainer.appendChild(img);
      imgLink.appendChild(articlesImgContainer);
      articlesContainer.appendChild(imgLink);
    
      let articlesDate = document.createElement("span");
      articlesDate.classList.add("articles-date");
      articlesDate.innerHTML = data["articles"][articleIndex].date;
      articlesContainer.appendChild(articlesDate);

      let articlesDescription = document.createElement("div");
      articlesDescription.classList.add("articles-description");

      let articlesDescriptionTitle = document.createElement("span");
      articlesDescriptionTitle.classList.add("articles-description-title");
      articlesDescriptionTitle.innerHTML = data["articles"][articleIndex].title;
      articlesDescription.appendChild(articlesDescriptionTitle);

      let articlesDescriptionText = document.createElement("p");
      articlesDescriptionText.classList.add("articles-description-text");
      articlesDescriptionText.innerHTML = data["articles"][articleIndex].text;
      articlesDescription.appendChild(articlesDescriptionText);

      let articlesDescriptionId = document.createElement("a");
      articlesDescriptionId.classList.add("articles-description-id");
      articlesDescriptionId.innerHTML = "more details";
      articlesDescriptionId.href = "articles.html?"+data["articles"][articleIndex].id;
      articlesDescription.appendChild(articlesDescriptionId);
      articlesContainer.appendChild(articlesDescription);
      articles.appendChild(articlesContainer);
    };
  })
  .catch(err => {
  })