from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from main_app.views import artista,index,album

urlpatterns = [
    path('admin/', admin.site.urls),
    path('artista/<str:nome_art>',artista,name='artista'),
    path('album/<str:nome_alb>',album,name='album'),
    path('',index,name='index'),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
