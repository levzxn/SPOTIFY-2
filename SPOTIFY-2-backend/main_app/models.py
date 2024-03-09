from django.db import models

class Artista(models.Model):
    nome_artista = models.CharField(max_length=30)
    icone_artista = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True)
    banner_artista = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True)
    background_gradient = models.CharField(max_length=200,blank=True)
    vizualizacoes_mensais = models.IntegerField()

    def __str__(self):
        return self.nome_artista

class Album(models.Model):
    titulo_album = models.CharField(max_length=30)
    artista = models.ForeignKey(Artista,on_delete=models.CASCADE)
    foto_album = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True)
    ano_lancamento = models.IntegerField()

    def __str__(self):
        return self.titulo_album

class Musica(models.Model):
    titulo_musica = models.CharField(max_length=30)
    vizualizacoes_musica = models.IntegerField()
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    duracao = models.DurationField()

    def __str__(self):
        return self.titulo_musica