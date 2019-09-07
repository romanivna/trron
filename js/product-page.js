const product = location.search.substr(1).split("_");
const productCategory = product[0];
const productId = product[1];

fetch('jsons/' + productCategory + '.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here

    document.getElementsByClassName("product-page-img")[0].src = data["drinks"][productId].image;
    document.getElementsByClassName("product-page-img")[0].title = data["drinks"][productId].name;

    document.getElementsByClassName("product-page-name")[0].innerHTML = data["drinks"][productId].category + " " + data["drinks"][productId].name;
    document.getElementsByClassName("product-page-price")[0].innerHTML = data["drinks"][productId].price.toFixed(2) + " uan.";

    const inStock = data["drinks"][productId].inStock;
    if (inStock == true) {
      document.getElementsByClassName("product-page-stock")[0].innerHTML = "on the shelf";
      document.getElementsByClassName("product-page-stock-description")[0].innerHTML = "The goods are in the store. You can pick it up now (until 21:00) or place a reservation for tomorrow.";
      document.getElementsByClassName("product-page-stock-again")[0].innerHTML = "In stock";
    } else {
      document.getElementsByClassName("product-page-stock")[0].innerHTML = "on order";
      document.getElementsByClassName("product-page-stock-description")[0].innerHTML = "Make a reservation and the product will be available within 48 hours.";
      document.getElementsByClassName("product-page-stock-again")[0].innerHTML = "Preorder";
    }

    document.getElementsByClassName("product-page-description-text")[0].innerHTML = data["drinks"][productId].description;
    document.getElementsByClassName("product-properties--utp")[0].innerHTML = data["drinks"][productId].UTP;

    document.getElementsByClassName("product-properties--color")[0].innerHTML = data["drinks"][productId].color;
    document.getElementsByClassName("product-properties--color")[0].href = "#" + data["drinks"][productId].color;


    document.getElementsByClassName("product-properties--style")[0].innerHTML = data["drinks"][productId].style;
    document.getElementsByClassName("product-properties--style")[0].href = "#" + data["drinks"][productId].style;

    document.getElementsByClassName("product-properties--region")[0].innerHTML = data["drinks"][productId].region;
    document.getElementsByClassName("product-properties--region")[0].href = "#" + data["drinks"][productId].region;

    document.getElementsByClassName("product-properties--brand")[0].innerHTML = data["drinks"][productId].brand;
    document.getElementsByClassName("product-properties--brand")[0].href = "#" + data["drinks"][productId].brand;

    document.getElementsByClassName("product-properties--manufacturer")[0].innerHTML = data["drinks"].manufacturer;
    document.getElementsByClassName("product-properties--manufacturer")[0].href = "#" + data["drinks"][productId].manufacturer;

    document.getElementsByClassName("product-properties--sort")[0].innerHTML = data["drinks"][productId].sort;
    document.getElementsByClassName("product-properties--sort")[0].href = "#" + data["drinks"][productId].sort;

    document.getElementsByClassName("product-properties--alcohol")[0].innerHTML = data["drinks"][productId].alcohol;
    document.getElementsByClassName("product-properties--volume")[0].innerHTML = data["drinks"][productId].volume;

    console.log(data);
  })
  .catch(err => {
    document.getElementsByClassName("product-page-description")[0].innerHTML = "The requested page " + location + " was not found.";
    document.getElementsByClassName("product-page-description")[0].classList.add("product-page-name")
    document.getElementsByClassName("product-page-img")[0].src = "img/error_404_1.jpg";
    document.getElementsByClassName("product-page-img")[0].classList.add("product-page-img-404")
  })