from main_app.models import Musica,Album,Artista
import random

def menu_lateral(request):
    models = getRandomModel(10)
    menu_lateral = {'models':models}
    return {'menu_lateral':menu_lateral}

def getRandomModel(num):
    musicas = list(Musica.objects.all())
    artistas = list(Artista.objects.all())
    albuns = list(Album.objects.all())
    random_models = []
    all_models = []+musicas+albuns+artistas
    models_indices = random.sample(range(0, len(all_models)), num)
    for indice in models_indices:
        random_models.append(all_models[indice])
    return random_models