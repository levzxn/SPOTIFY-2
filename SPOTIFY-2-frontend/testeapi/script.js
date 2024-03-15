class No {
    constructor(ant, info, prox) {
        this.info = info
        this.prox = prox
        this.ant = ant
    }
}

class Ldes {
    constructor() {
        this.prim = null
        this.atual = null
        this.ult = null
        this.quant = 0
    }

    encontrarPorValor(valor) {
        let aux = this.prim;
        while (aux != null) {
            if (aux.info == valor) {
                return aux;
            }
            aux = aux.prox;
            if (aux === this.prim) {
                return null;
            }
        }
    }

    inserirFim(valor) {
        if (this.quant === 0) {
            this.prim = this.ult = new No(null, valor, null);
            this.quant++;
        } else {
            let novoNo = new No(this.ult, valor, null);
            this.ult.prox = novoNo;
            this.ult = novoNo;
            this.quant++;
        }
    }

    inserirInicio(valor) {
        if (this.quant === 0) {
            this.prim = this.ult = new No(null, valor, null);
            this.quant++;
        } else {
            let novoNo = new No(null, valor, this.prim);
            this.prim.ant = novoNo;
            this.prim = novoNo;
            this.quant++;
        }
    }

    anteriorItem() {
        this.atual = this.atual.ant
    }

    proximoItem() {
        this.atual = this.atual.prox
    }

    verAtual() {
        return this.atual
    }

    verLista() {
        var aux = this.prim
        while (aux != this.ult) {
            console.log(aux.info)
            aux = aux.prox
        }
        console.log(this.ult.info)
    }

    verCiclo() {
        var aux = this.prim
        while (true) {
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

function carregarLis() {
    const listaLi = document.querySelectorAll('.musicas_maisOuvidas');
    for (let i = 0; i < listaLi.length; i++) {
        if (i >= 3) {
            listaLi[i].style.display = 'none';
        }
    }
}

let mostrandoTodos = false
function mostrarTodos() {
    const botao = document.querySelector('.ver_mais')
    const listaLi = document.querySelectorAll('.musicas_maisOuvidas');
    if (mostrandoTodos) {
        for (let i = 0; i < listaLi.length; i++) {
            if (i >= 3) {
                listaLi[i].style.display = 'none';
            }
        }
        botao.innerHTML = 'Ver mais'
        mostrandoTodos = false;
    }
    else {
        for (let i = 0; i < listaLi.length; i++) {
            listaLi[i].style.display = 'flex';
        }
        botao.innerHTML = 'Ver menos'
        mostrandoTodos = true;
    }
}

function enumerarMusicas() {
    const listaLi = document.querySelectorAll('.musicas_maisOuvidas');
    const paragrafo = document.querySelectorAll('.numero_padrao')
    for (let i = 0; i < listaLi.length; i++) {
        paragrafo[i].innerHTML = i + 1
    }
}


class ReprodutorMusica {
    constructor() {
        this.audioEmReproducao = null;
        this.listaBotoes = document.querySelectorAll('.reprodutor');
        this.listaBotoesCircular = new Ldes();
        this.configurarEventos();

    }



    configurarEventos() {
        this.listaBotoes.forEach((botao) => {
            const audioId = this.fatiarId(botao)
            this.listaBotoesCircular.inserirFim(botao)
            console.log(this.listaBotoesCircular)

            botao.onclick = () => this.reproduzirClicada(botao, audioId);
        });
    }


    fatiarId(botaoaFatiar) {
        const audioMusica = botaoaFatiar.classList[1];
        const audioId = `#audio_${audioMusica}`;
        return (audioId)
    }

    reproduzirClicada(botao, audioId) {
        this.listaBotoesCircular.atual = this.listaBotoesCircular.encontrarPorValor(botao)
        this.manipularAudio()
        this.atualizarDadosMusica()

    }

    reproduzirLista() {
        if (this.listaBotoesCircular.atual == null) {
            this.listaBotoesCircular.atual = this.listaBotoesCircular.prim
        }
        this.manipularAudio()
    }

    manipularAudio() {
        const botao = this.listaBotoesCircular.atual.info;
        const audioId = this.fatiarId(botao);
        const audio = document.querySelector(audioId);
        if (audio == null) {
            return null;
        } else {
            if (this.audioEmReproducao && this.audioEmReproducao !== audio) {
                this.pararAudio(this.audioEmReproducao);
            }
            const audioAcabou = () => {
                audio.removeEventListener('ended', audioAcabou);
                this.avancarMusica();
                console.log('teste1')
            };
            audio.addEventListener('ended', audioAcabou);
            console.log('teste2')
            this.playPause(audio);
            this.audioEmReproducao = audio;
        }
    }

    avancarMusica() {
        if (this.listaBotoesCircular.atual == null || this.listaBotoesCircular.atual.prox == null) {
            this.pararAudio(this.audioEmReproducao)
            this.playPause(this.audioEmReproducao)
            return
        }
        this.listaBotoesCircular.proximoItem()
        this.manipularAudio()
        this.atualizarDadosMusica()
        console.log('teste3')
    }

    voltarMusica() {
        if (this.listaBotoesCircular.atual == null || this.listaBotoesCircular.atual.ant == null) {
            this.pararAudio(this.audioEmReproducao)
            this.playPause(this.audioEmReproducao)
            return
        }
        this.listaBotoesCircular.anteriorItem()
        this.manipularAudio()

    }

    playPause(audio) {
        console.log(audio.currentTime)
        const playPauseButton = document.querySelector('.play-pause');
        if (audio.paused) {
            audio.play();
            playPauseButton.classList.remove('fas', 'fa-play');
            playPauseButton.classList.add('fas', 'fa-pause');
        }
        else {
            audio.pause();
            playPauseButton.classList.remove('fas', 'fa-pause');
            playPauseButton.classList.add('fas', 'fa-play');
        }
        this.atualizarDadosMusica()
    }


    pararAudio(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    atualizarDadosMusica() {
        const botao = this.listaBotoesCircular.atual.info
        const imagemMusica = botao.querySelector('img');
        const nomeArtista = document.querySelector('.nome_artista');
        const nomeMusica = botao.querySelector('.texto_padrao.titulo_musica');
        const imagemFooter = document.querySelector('.icone_footer');
        const nomeMusicaFooter = document.querySelector('.nome_musica_footer');
        const nomeArtistaFooter = document.querySelector('.nome_artista_footer');
        imagemFooter.src = imagemMusica.src;
        nomeArtistaFooter.innerHTML = nomeArtista.innerHTML;
        nomeMusicaFooter.innerHTML = nomeMusica.innerHTML;
    }


}
document.addEventListener('DOMContentLoaded', function() {
    const containerMusicas = document.querySelector('.lista_maisOuvidas');
    const botoesControle = document.querySelectorAll('.botoes_controle')
    fetch('http://localhost:3000/musicas')
        .then(resposta => resposta.json())
        .then((musicas) => {
            musicas.forEach((musica) => {
                containerMusicas.innerHTML += `
                    <button class="reprodutor ${musica.id}" style="background-color: transparent; width: 100%;">
                        <li class="musicas_maisOuvidas">
                            <p class="numero_padrao">1</p>
                            <div class="foto_titulo">
                                <img class="imagem album2" src="${musica.capaAlbum}" alt="capa" width="20px" height="20px">
                            </div>
                            <div class="texto_musica">
                                <p class="texto_padrao titulo_musica">${musica.titulo}</p>
                                <p class="texto_padrao visualizacoes">${musica.visualizacoes}</p>
                                <p class="texto_padrao duracao">${musica.duracao}</p>
                            </div>
                            <audio id="audio_${musica.id}" controls style="display: none;">
                                <source src="${musica.url}" type="audio/mpeg">
                            </audio>
                        </li>
                    </button>
                `;
            });
            const reprodutorMusica = new ReprodutorMusica();
        });
});
let reprodutor;

$(document).ready(function () {
    ajustarPadding();
    ajustarFonte();
    carregarLis();
    enumerarMusicas();

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
