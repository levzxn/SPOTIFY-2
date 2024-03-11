class No{
    constructor(ant,info,prox){
        this.info = info
        this.prox = prox
        this.ant = ant
    }
}

class Ldesc{
    constructor(){
        this.prim = null
        this.atual = null
        this.ult = null
        this.quant = 0 
    }

    inserirFim(valor) {
        if (this.quant === 0) {
            this.prim = this.ult = new No(null, valor, null);
            this.prim.prox = this.prim; 
            this.prim.ant = this.prim; 
            this.quant++;
        } else {
            let novoNo = new No(this.ult, valor, this.prim);
            this.ult.prox = novoNo; 
            this.ult = novoNo; 
            this.prim.ant = this.ult; 
            this.quant++;
        }
    }

    inserirInicio(valor) {
        if (this.quant === 0) {
            this.prim = this.ult = new No(null, valor, null);
            this.prim.prox = this.prim;
            this.prim.ant = this.prim; 
            this.quant++;
        } else {
            let novoNo = new No(this.ult, valor, this.prim);
            this.prim.ant = novoNo;
            novoNo.prox = this.prim; 
            this.prim = novoNo; 
            this.ult.prox = this.prim; 
            this.quant++;
        }
    }

    anteriorItem(){
        this.atual = this.atual.ant
    }

    proximoItem() {
        this.atual = this.atual.prox
    }

    verAtual(){
        return this.atual
    }

    verLista(){
        var aux = this.prim
        while(aux!=this.ult){
            console.log(aux.info)
            aux = aux.prox
        }
        console.log(this.ult.info)
    }

    verCiclo(){
        var aux = this.prim
        while(true){
            console.log(aux.info)
            aux = aux.prox
        }
    }
}



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



function ajustarFonte() {
    var tamanhoJanela = $('.container_principal').width()
    var proporcao = tamanhoJanela / 350;
    var tamanhoFonte = proporcao + 'rem';
    if (proporcao <= 3.5) {
        $('.nome_artista').css('font-size', '3.5rem')
    }
    else {
        $('.nome_artista').css('font-size', tamanhoFonte)
    }


}

function getDadosMusica(nomeArtista, fotoMusica, tituloMusica) {
    let imagemFooter = document.querySelector('.icone_footer');
    let nomeMusicaFooter = document.querySelector('.nome_musica_footer');
    let nomeArtistaFooter = document.querySelector('.nome_artista_footer');
    imagemFooter.src = fotoMusica.src;
    console.log(fotoMusica)
}

function playPause(audio) {
    let playPauseButton = document.querySelector('.play-pause');
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.remove('fas', 'fa-play');
        playPauseButton.classList.add('fas', 'fa-pause');
    } else {
        audio.pause();
        playPauseButton.classList.remove('fas', 'fa-pause');
        playPauseButton.classList.add('fas', 'fa-play');
    }
}

function pauseAudio(audio) {
    audio.pause();
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function anteriorAudio(audio) {

}

let audioEmReproducao = null;


function tocaSom(seletorAudio) {
    const audio = document.querySelector(seletorAudio);
    if (audioEmReproducao && audioEmReproducao !== audio) {
        stopAudio(audioEmReproducao);
    }
    playPause(audio);
    audioEmReproducao = audio;
}



const listaBotoes = document.querySelectorAll('.reprodutor')
const listaBotoesCircular = new Ldesc()

for (let contador = 0; contador<listaBotoes.length; contador++){
    listaBotoesCircular.inserirFim(listaBotoes[contador])
}


for (let contador = 0; contador < listaBotoes.length; contador++) {
    const musica = listaBotoes[contador];
    const audioMusica = musica.classList[1]
    const audioId = `#audio_${audioMusica}`;

    musica.onclick = function () {
        const imagemMusica = musica.querySelector('img')
        const nomeArtista = document.getElementsByClassName('.nome_artista')
        const nomeMusica = musica.getElementsByClassName('.texto_padrao.titulo_musica')
        console.log(imagemMusica)
        getDadosMusica(imagemMusica, nomeArtista, nomeMusica)
        tocaSom(audioId)
    }
}



$(document).ready(function () {
    ajustarPadding();
    ajustarFonte();

    $(window).resize(function () {
        ajustarPadding();
        ajustarFonte();
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

