from django.db import models
import random

class Artista(models.Model):
    nome_artista = models.CharField(max_length=30)
    icone_artista = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True,null=True)
    banner_artista = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True)
    visualizacoes_mensais = models.IntegerField()

    def __str__(self):
        return self.nome_artista
    
    @property
    def visualizacoes_formatadas(self):
        v_format =  f'{self.visualizacoes_mensais:,.0f}'
        return v_format.replace(',','.')

class Album(models.Model):
    titulo_album = models.CharField(max_length=30)
    artista = models.ForeignKey(Artista,on_delete=models.CASCADE)
    foto_album = models.ImageField(upload_to="fotos/%Y/%m/%d",blank=True)
    ano_lancamento = models.IntegerField()

    def __str__(self):
        return self.titulo_album
    
    def get_random_albuns(num):
        albuns = Album.objects.all()
        random_albuns = []
        albuns_indices = random.sample(range(0, len(albuns)), num)
        for indice in albuns_indices: 
            random_albuns.append(albuns[indice])
        return random_albuns

class Musica(models.Model):
    titulo_musica = models.CharField(max_length=30)
    visualizacoes_musica = models.IntegerField()
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    audio_mp3 = models.FileField(upload_to="musicas/%Y/%m/%d",blank=True)
    duracao = models.DurationField()

    def __str__(self):
        return self.titulo_musica
    
    @property
    def duracao_formatada(self):
        segundos = self.duracao.seconds
        horas = segundos // 3600
        minutos = (segundos % 3600) // 60
        segundos_restantes = segundos % 60
        segundos_f = round(segundos_restantes,2)

        if horas > 0:
            return f'{horas}:{minutos}:{segundos_f}'
        else:
            return f'{minutos}:{segundos_restantes}'
        
    @property
    def visualizacoes_formatadas(self):
        v_format =  f'{self.visualizacoes_musica:,.0f}'
        return v_format.replace(',','.')
    
    def get_random_musicas(num):
        musicas = Musica.objects.all()
        random_musicas = []
        musica_indices = random.sample(range(0, len(musicas)), num)
        for indice in musica_indices: 
            random_musicas.append(musicas[indice])
        return random_musicas