from django.contrib import admin
from musicas.models import Musicas

class MusicasAdmin(admin.ModelAdmin):
    list_display = ('titulo',)

admin.site.register(Musicas,MusicasAdmin)

