# Generated by Django 5.0.3 on 2024-03-09 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_alter_artista_icone_artista'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artista',
            name='icone_artista',
            field=models.ImageField(blank=True, upload_to='fotos/%Y/%m/%d'),
        ),
    ]
