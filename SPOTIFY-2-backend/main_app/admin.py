from django.contrib import admin
from main_app.models import Artista,Album,Musica

class VizualizacaoArtista(admin.ModelAdmin):
    list_display = ['nome_artista']

admin.site.register(Artista,VizualizacaoArtista)

class VizualizacaoAlbum(admin.ModelAdmin):
    list_display = ['titulo_album']

admin.site.register(Album,VizualizacaoAlbum)

class VizualizacaoMusica(admin.ModelAdmin):
    list_display = ['titulo_musica']

admin.site.register(Musica,VizualizacaoMusica)
