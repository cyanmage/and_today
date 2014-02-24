# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Post'
        db.create_table('core_post', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=400)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Domaine'])),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateField')(auto_now_add=True, default=datetime.datetime(2013, 12, 10, 0, 0), blank=True)),
        ))
        db.send_create_signal('core', ['Post'])

        # Adding model 'Domaine'
        db.create_table('core_domaine', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('intitule_domaine', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('core', ['Domaine'])


    def backwards(self, orm):
        # Deleting model 'Post'
        db.delete_table('core_post')

        # Deleting model 'Domaine'
        db.delete_table('core_domaine')


    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '400'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime(2013, 12, 10, 0, 0)', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Domaine']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']