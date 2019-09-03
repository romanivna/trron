fetch('jsons/articles.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    articlesCounter = data["articles"].length;
    let a = Math.floor(Math.random() * articlesCounter);
    let b = Math.floor(Math.random() * articlesCounter);
    let c = Math.floor(Math.random() * articlesCounter);

    const width = screen.width;
    const articles = document.getElementsByClassName("articles")[0];
    if (width>=800){
      bildArticle(a);
      bildArticle(b);
      bildArticle(c);
    } else if(width<400){
      bildArticle(a);
    } else{
      bildArticle(a);
      bildArticle(b);
    }

    function bildArticle(i){
      let articlesConteiner = document.createElement("div");
      articlesConteiner.classList.add("articles-conteiner");

      let imgLink = document.createElement("a");
      imgLink.href = "#article$"+data["articles"][i]["id"];

      let articlesImgConteiner = document.createElement("div");
      articlesImgConteiner.classList.add("articles-img-conteiner");

      let img = document.createElement("img");
      img.classList.add("articles-img");
      img.src = data["articles"][i]["image"];
      articlesImgConteiner.appendChild(img);
      imgLink.appendChild(articlesImgConteiner);
      articlesConteiner.appendChild(imgLink);
    
      let articlesDate = document.createElement("span");
      articlesDate.classList.add("articles-date");
      articlesDate.innerHTML = data["articles"][i]["date"];
      articlesConteiner.appendChild(articlesDate);

      let articlesDescription = document.createElement("div");
      articlesDescription.classList.add("articles-description");

      let articlesDescriptionTitle = document.createElement("span");
      articlesDescriptionTitle.classList.add("articles-description-title");
      articlesDescriptionTitle.innerHTML = data["articles"][i]["title"];
      articlesDescription.appendChild(articlesDescriptionTitle);

      let articlesDescriptionText = document.createElement("p");
      articlesDescriptionText.classList.add("articles-description-text");
      articlesDescriptionText.innerHTML = data["articles"][i]["text"];
      articlesDescription.appendChild(articlesDescriptionText);

      let articlesDescriptionId = document.createElement("a");
      articlesDescriptionId.classList.add("articles-description-id");
      articlesDescriptionId.innerHTML = "more details";
      articlesDescriptionId.href = "#article$"+data["articles"][i]["id"];
      articlesDescription.appendChild(articlesDescriptionId);
      articlesConteiner.appendChild(articlesDescription);
      articles.appendChild(articlesConteiner);
    };
  })
  .catch(err => {
    alert ("Something went wrong please try again");
  })