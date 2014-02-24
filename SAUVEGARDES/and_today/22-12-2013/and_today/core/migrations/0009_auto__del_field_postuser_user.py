# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'PostUser.user'
        db.delete_column('core_postuser', 'user_id')


    def backwards(self, orm):
        # Adding field 'PostUser.user'
        db.add_column('core_postuser', 'user',
                      self.gf('django.db.models.fields.related.ForeignKey')(default='no-user', to=orm['auth.User']),
                      keep_default=False)


    models = {
        'core.domaine': {
            'Meta': {'ordering': "('intitule_domaine',)", 'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'max_length': '4', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nom_pays': ('django.db.models.fields.CharField', [], {'max_length': '50', 'null': 'True'})
        },
        'core.postgenerique': {
            'Meta': {'object_name': 'PostGenerique'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now_add': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Domaine']", 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Pays']", 'null': 'True'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        'core.postuser': {
            'Meta': {'object_name': 'PostUser'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now_add': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now': 'True'}),
            'heure': ('django.db.models.fields.TimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']