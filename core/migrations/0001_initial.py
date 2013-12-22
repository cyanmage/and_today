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
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal('core', ['Post'])


    def backwards(self, orm):
        # Deleting model 'Post'
        db.delete_table('core_post')


    models = {
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '400'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']