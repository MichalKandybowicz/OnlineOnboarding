# Generated by Django 3.1 on 2020-08-21 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0003_auto_20200814_1422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
    ]
