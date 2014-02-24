# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Post.date_modification'
        db.alter_column('core_post', 'date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True))

        # Changing field 'Post.date_creation'
        db.alter_column('core_post', 'date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True))

    def backwards(self, orm):

        # Changing field 'Post.date_modification'
        db.alter_column('core_post', 'date_modification', self.gf('django.db.models.fields.DateField')(auto_now=True))

        # Changing field 'Post.date_creation'
        db.alter_column('core_post', 'date_creation', self.gf('django.db.models.fields.DateField')(auto_now_add=True))

    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'max_length': '4', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nom_pays': ('django.db.models.fields.CharField', [], {'max_length': '50', 'null': 'True'})
        },
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Domaine']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Pays']"}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']