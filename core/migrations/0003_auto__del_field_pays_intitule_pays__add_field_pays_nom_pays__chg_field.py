# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Pays.intitule_pays'
        db.delete_column('core_pays', 'intitule_pays')

        # Adding field 'Pays.nom_pays'
        db.add_column('core_pays', 'nom_pays',
                      self.gf('django.db.models.fields.CharField')(null=True, max_length=50),
                      keep_default=False)


        # Changing field 'Pays.code_pays'
        db.alter_column('core_pays', 'code_pays', self.gf('django.db.models.fields.CharField')(null=True, max_length=4))

    def backwards(self, orm):

        # User chose to not deal with backwards NULL issues for 'Pays.intitule_pays'
        raise RuntimeError("Cannot reverse this migration. 'Pays.intitule_pays' and its values cannot be restored.")
        
        # The following code is provided here to aid in writing a correct migration        # Adding field 'Pays.intitule_pays'
        db.add_column('core_pays', 'intitule_pays',
                      self.gf('django.db.models.fields.CharField')(max_length=50),
                      keep_default=False)

        # Deleting field 'Pays.nom_pays'
        db.delete_column('core_pays', 'nom_pays')


        # Changing field 'Pays.code_pays'
        db.alter_column('core_pays', 'code_pays', self.gf('django.db.models.fields.CharField')(max_length=4, default=2))

    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '4'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nom_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '50'})
        },
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateField', [], {'auto_now_add': 'True', 'blank': 'True', 'default': 'datetime.datetime.now'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Domaine']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'to': "orm['core.Pays']"}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']