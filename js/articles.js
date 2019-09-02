getJSON('https://shopforyourhome.000webhostapp.com/jsons/articles.json',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log (data);
  }
});