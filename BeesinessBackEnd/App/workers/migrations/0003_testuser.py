# Generated by Django 5.0.4 on 2024-06-07 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0002_alter_customuser_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='testUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
            ],
        ),
    ]