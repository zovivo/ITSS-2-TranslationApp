const URL = "https://teachablemachine.withgoogle.com/models/kfciZHdP_/";

let model, webcam, labelContainer, maxPredictions;

function readURL(input) {
  if (input.files && input.files[0]) {
    $('#blah').removeClass('none')
    $('#start-button').removeClass('none')
    $('.header-content').removeClass('header-content')
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#blah')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
async function start() {

  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer = document.getElementById('label1-container');
  for (let i = 0; i < maxPredictions; i++) { // and class labels
    labelContainer.appendChild(document.createElement('div'));
  }

  await predict();

}
async function predict() {
  var img = document.querySelector('#blah')
  const prediction = await model.predict(img);
  $('.sub').removeClass('none')
  $('.text-center').removeClass('none')
  let maxPredictionClass = {
    name: prediction[0].className,
    probability: prediction[0].probability
  };
  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability > maxPredictionClass.probability) {
      maxPredictionClass.name = prediction[i].className;
      maxPredictionClass.probability = prediction[i].probability;
    }
    // const classPrediction =
    //   prediction[i].className + ': ' + prediction[i].probability.toFixed(2) * 100 + '%';
    // labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  await getData(maxPredictionClass);
}

async function getData(maxPredictionClass) {
  console.log(maxPredictionClass);
  $.ajax({
    url: 'https://demo-translate-zovivo.herokuapp.com/dish/get-by-name?name=' + maxPredictionClass.name,
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (data) {
      if (data) {
        console.log(data);
        setResult(data.data);
      }
    },
  });
}

function setResult(dish) {
  console.log("dish");
  console.log(dish);
  var vietnameseResult = $("#vietnameseResult");
  var japaneseResult = $("#japaneseResult");
  console.log(vietnameseResult);
  vietnameseResult.val(dish.vietnameseName);
  japaneseResult.val(dish.japaneseName);
  showImages(dish.restaurants);
}

function showImages(restaurants) {
  $("#listImages").empty();
  if (restaurants.length > 0) {
    var listImage = "";
    restaurants.map((restaurant) => {
      listImage += '<div class="col-lg-3 col-md-6 mb-4">'
        + '<div class="card h-100">'
        + '<img class="card-img-top" src="' + restaurant.image + '" alt="">'
        + '<div class="card-body">'
        + '<h4 class="card-title">' + restaurant.name + '</h4>'
        + '<p class="card-text">' + restaurant.address + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
    });
    $('#listImages').append(listImage);
  }
}