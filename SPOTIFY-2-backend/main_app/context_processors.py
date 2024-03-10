from main_app.models import Musica

def menu_lateral(request):
    musicas = Musica.get_random_musicas(8)
    menu_lateral = {'musicas':musicas}
    return {'menu_lateral':menu_lateral}