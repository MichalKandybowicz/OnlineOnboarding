# Generated by Django 3.0.6 on 2020-08-14 14:22

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0002_auto_20200814_1421'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]
