from django.db import models

class Musicas(models.Model):
    titulo = models.CharField(max_length=50)
    artista = models.CharField(max_length=50)
    ano = models.CharField(max_length=4)
    album = models.CharField(max_length=50)
    foto = models.ImageField(upload_to="fotos/%Y/%m/%d")