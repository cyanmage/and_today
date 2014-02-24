# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Post'
        db.delete_table('core_post')

        # Adding model 'PostUser'
        db.create_table('core_postuser', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True, default=datetime.datetime.now)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(blank=True, auto_now=True, default=datetime.datetime.now)),
            ('heure', self.gf('django.db.models.fields.TimeField')()),
        ))
        db.send_create_signal('core', ['PostUser'])

        # Adding model 'PostGenerique'
        db.create_table('core_postgenerique', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True, default=datetime.datetime.now)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(blank=True, auto_now=True, default=datetime.datetime.now)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Pays'], null=True)),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Domaine'], null=True)),
        ))
        db.send_create_signal('core', ['PostGenerique'])


    def backwards(self, orm):
        # Adding model 'Post'
        db.create_table('core_post', (
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(blank=True, default=datetime.datetime.now, auto_now=True)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True, default=datetime.datetime.now)),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Domaine'], null=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Pays'], null=True)),
        ))
        db.send_create_signal('core', ['Post'])

        # Deleting model 'PostUser'
        db.delete_table('core_postuser')

        # Deleting model 'PostGenerique'
        db.delete_table('core_postgenerique')


    models = {
        'core.domaine': {
            'Meta': {'ordering': "('intitule_domaine',)", 'object_name': 'Domaine'},
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
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True', 'default': 'datetime.datetime.now'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True', 'default': 'datetime.datetime.now'}),
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
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True', 'default': 'datetime.datetime.now'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True', 'default': 'datetime.datetime.now'}),
            'heure': ('django.db.models.fields.TimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']