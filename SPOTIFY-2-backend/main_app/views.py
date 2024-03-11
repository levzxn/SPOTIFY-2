from django.shortcuts import render,get_object_or_404
from main_app.models import Artista,Album,Musica

def index(request):
    albuns = Album.get_random_albuns(6)
    musicas = Musica.get_random_musicas(8)
    dados = {'albuns':albuns,'musicas':musicas}
    
    return render(request,'index.html',{'dados':dados})

def artista(request,nome_art):
    artista = get_object_or_404(Artista,nome_artista=nome_art)
    albuns_artista = Album.objects.filter(artista=artista)
    musicas_artista = Musica.objects.filter(album__artista=artista).order_by('-visualizacoes_musica')
    numeros = [1,2,3,4,5,6,7,8,9,10]
    dados = {'numeros':numeros,'artista':artista,'albuns':albuns_artista,"musicas":musicas_artista}

    return render(request,'artistapage.html',{'dados':dados})

def album(request,nome_alb):
    album = get_object_or_404(Album,titulo_album=nome_alb)
    musicas = Musica.objects.filter(album=album)
    dados = {'album':album,'musicas':musicas}
    return render(request,'album.html',{'dados':dados})