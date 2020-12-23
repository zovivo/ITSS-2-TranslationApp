var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var id = getUrlParameter('id');

function setResult(restaurant) {
    $("#restaurantName").text(restaurant.name);
    $("#restaurantAddress").text(restaurant.address);
    $("#restaurantPhoneNumber").text(restaurant.phoneNumber);
    setImages(restaurant.images);
    setMenu(restaurant.dishes);
}

function setImages(images) {
    if (images.length > 0) {
        var listImage = "";
        $("#listImages").empty();
        images.map((image, index) => {
            listImage += (index == 0 ? '<div class="carousel-item active">' : '<div class="carousel-item">')
                + '<img class="d-block img-fluid" src="' + image + '" alt="slide' + index + '">'
                + '</div>'
        });
        $('#listImages').append(listImage);
    }
}

function setMenu(dishes) {
    if (dishes.length > 0) {
        var listImage = "";
        $("#menu").empty();
        dishes.map((dish, index) => {
            listImage +=
                '<div class="col-lg-4 col-md-6 mb-4">'
                + '<div class="card h-100">'
                + '<div class="card-body">'
                + '<h4 class="card-title">'
                + dish.name
                + '</h4>'
                + '<h5>$' + (10 + index) + '</h5>'
                + '</div>'
                + '<div class="card-footer">'
                + '<small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>'
                + '</div>'
                + ' </div>'
                + '</div>'
        });
        $('#menu').append(listImage);
    }
}

function setRestaurant(id) {
    $.ajax({
        url: 'https://demo-translate-zovivo.herokuapp.com/restaurant/' + id,
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

$(document).ready(function () {
    console.log("ready!");
    console.log(id);
    setRestaurant(id);
});
