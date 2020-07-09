# Generated by Django 3.0.6 on 2020-07-09 12:14

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
                ('uuid', models.UUIDField(editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(help_text='Enter a brief description', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(help_text='Enter a brief description', max_length=1500)),
                ('link', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(help_text='Enter a brief description', max_length=1500)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
                ('type', models.CharField(blank=True, choices=[('msa', 'Multi select answer'), ('osa', 'One select answer'), ('oa', 'Open answer')], default='msa', help_text='Answer type', max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='SectionsAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Answer')),
                ('sections', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Section')),
            ],
        ),
        migrations.CreateModel(
            name='PageSections',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Page')),
                ('sections', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Section')),
            ],
        ),
        migrations.AddField(
            model_name='page',
            name='sections',
            field=models.ManyToManyField(blank=True, through='onboarding.PageSections', to='onboarding.Section'),
        ),
        migrations.CreateModel(
            name='PackagePage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Package')),
                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Page')),
            ],
        ),
        migrations.CreateModel(
            name='PackageEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Email')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='onboarding.Package')),
            ],
        ),
        migrations.AddField(
            model_name='package',
            name='email',
            field=models.ManyToManyField(blank=True, through='onboarding.PackageEmail', to='onboarding.Email'),
        ),
        migrations.AddField(
            model_name='package',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='package',
            name='pages',
            field=models.ManyToManyField(blank=True, through='onboarding.PackagePage', to='onboarding.Page'),
        ),
    ]
