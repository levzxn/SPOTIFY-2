from django.shortcuts import render,get_object_or_404
from main_app.models import Artista,Album,Musica

def artista(request,nome_art):
    artista = get_object_or_404(Artista,nome_artista=nome_art)
    albuns_artista = Album.objects.filter(artista=artista)
    musicas_artista = []
    for album in albuns_artista:
        musicas = Musica.objects.filter(album=album)
        musicas_artista+=musicas
    numeros = [1,2,3,4,5,6,7,8,9,10]
    dados = {'numeros':numeros,'artista':artista,'albuns':albuns_artista,"musicas":musicas_artista}

    return render(request,'artistapage.html',{'dados':dados})
