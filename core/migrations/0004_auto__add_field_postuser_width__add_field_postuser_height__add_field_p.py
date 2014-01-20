# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'PostUser.width'
        db.add_column('core_postuser', 'width',
                      self.gf('django.db.models.fields.IntegerField')(default=200),
                      keep_default=False)

        # Adding field 'PostUser.height'
        db.add_column('core_postuser', 'height',
                      self.gf('django.db.models.fields.IntegerField')(default=150),
                      keep_default=False)

        # Adding field 'PostGenerique.width'
        db.add_column('core_postgenerique', 'width',
                      self.gf('django.db.models.fields.IntegerField')(default=200),
                      keep_default=False)

        # Adding field 'PostGenerique.height'
        db.add_column('core_postgenerique', 'height',
                      self.gf('django.db.models.fields.IntegerField')(default=150),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'PostUser.width'
        db.delete_column('core_postuser', 'width')

        # Deleting field 'PostUser.height'
        db.delete_column('core_postuser', 'height')

        # Deleting field 'PostGenerique.width'
        db.delete_column('core_postgenerique', 'width')

        # Deleting field 'PostGenerique.height'
        db.delete_column('core_postgenerique', 'height')


    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine', 'ordering': "('intitule_domaine',)"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '4'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nom_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '50'})
        },
        'core.postgenerique': {
            'Meta': {'object_name': 'PostGenerique'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300', 'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {'default': 'datetime.datetime.now'}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True', 'default': 'datetime.datetime.now'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'default': 'datetime.datetime.now', 'auto_now': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Domaine']", 'default': '0'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Pays']", 'default': '0'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'null': 'True', 'default': "''"}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        },
        'core.postuser': {
            'Meta': {'object_name': 'PostUser'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300', 'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {'default': 'datetime.datetime.now'}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True', 'default': 'datetime.datetime.now'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'default': 'datetime.datetime.now', 'auto_now': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'heure': ('django.db.models.fields.TimeField', [], {'null': 'True', 'default': 'datetime.datetime(2014, 1, 19, 0, 0)'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'null': 'True', 'default': "''"}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        }
    }

    complete_apps = ['core']