# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Post.contenu'
        db.alter_column('core_post', 'contenu', self.gf('django.db.models.fields.CharField')(max_length=300))

    def backwards(self, orm):

        # Changing field 'Post.contenu'
        db.alter_column('core_post', 'contenu', self.gf('django.db.models.fields.CharField')(max_length=400))

    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime(2013, 12, 10, 0, 0)', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Domaine']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']