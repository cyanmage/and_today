# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Cadre'
        db.create_table('core_cadre', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('images_de_fond', self.gf('django.db.models.fields.TextField')(default='')),
            ('couleur_de_fond', self.gf('django.db.models.fields.TextField')(default='#FFFFFF')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, blank=True, auto_now_add=True)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now=True, blank=True)),
        ))
        db.send_create_signal('core', ['Cadre'])


    def backwards(self, orm):
        # Deleting model 'Cadre'
        db.delete_table('core_cadre')


    models = {
        'core.cadre': {
            'Meta': {'object_name': 'Cadre'},
            'couleur_de_fond': ('django.db.models.fields.TextField', [], {'default': "'#FFFFFF'"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now_add': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'images_de_fond': ('django.db.models.fields.TextField', [], {'default': "''"})
        },
        'core.domaine': {
            'Meta': {'object_name': 'Domaine', 'ordering': "('intitule_domaine',)"},
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
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now_add': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'default': '0', 'to': "orm['core.Domaine']", 'null': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'default': '0', 'to': "orm['core.Pays']", 'null': 'True'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True'}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        },
        'core.postuser': {
            'Meta': {'object_name': 'PostUser'},
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True', 'auto_now_add': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'heure': ('django.db.models.fields.TimeField', [], {'default': 'datetime.datetime(2014, 2, 18, 0, 0)', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True'}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        }
    }

    complete_apps = ['core']