function averageColor(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    var sumR = 0, sumG = 0, sumB = 0;

    for (var i = 0; i < data.length; i += 4) {
        sumR += data[i];
        sumG += data[i + 1];
        sumB += data[i + 2];
    }

    var avgR = sumR / (data.length / 4);
    var avgG = sumG / (data.length / 4);
    var avgB = sumB / (data.length / 4);

    var darkerR = Math.floor(avgR * 0.5);
    var darkerG = Math.floor(avgG * 0.5);
    var darkerB = Math.floor(avgB * 0.5);

    var cor = 'rgb(' + darkerR + ',' + darkerG + ',' + darkerB + ')';
    return cor;
}

function ajustarPadding() {
    var alturaHeader = $('.container_header.lateral').outerHeight();
    $('.sugestoes.container_lateral').css('padding-top', alturaHeader + 'px');
}


$(document).ready(function () {
    ajustarPadding();

    $(window).resize(function () {
        ajustarPadding();
    });

    var bgImageUrl = $('.banner').css('background-image');

    bgImageUrl = bgImageUrl.replace('url(', '').replace(')', '').replace(/\"/gi, "");

    var tempImg = $('<img>');
    tempImg.hide();
    $('body').append(tempImg);

    tempImg.attr('src', bgImageUrl).on('load', function () {
        var avgColor = averageColor(this);

        var gradient = `linear-gradient(180deg, ${avgColor} 10%, rgba(18, 18, 18, 1) 51%`;

        $('.menu_maisOuvidas').css('background', avgColor)
        $('.menu_maisOuvidas').css('background', gradient);
    });
});

