# Generated by Django 3.1 on 2020-11-02 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0018_companyquestionandanswer_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyquestionandanswer',
            name='answer',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='companyquestionandanswer',
            name='question',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]