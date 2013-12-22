# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Pays'
        db.create_table('core_pays', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('code_pays', self.gf('django.db.models.fields.CharField')(max_length=4)),
            ('intitule_pays', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('core', ['Pays'])

        # Adding model 'Domaine'
        db.create_table('core_domaine', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('intitule_domaine', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('core', ['Domaine'])

        # Adding field 'Post.domaine'
        db.add_column('core_post', 'domaine',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Domaine'], null=True),
                      keep_default=False)

        # Adding field 'Post.date_creation'
        db.add_column('core_post', 'date_creation',
                      self.gf('django.db.models.fields.DateField')(default=datetime.datetime.now, auto_now_add=True, blank=True),
                      keep_default=False)

        # Adding field 'Post.pays'
        db.add_column('core_post', 'pays',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Pays'], null=True),
                      keep_default=False)


        # Changing field 'Post.contenu'
        db.alter_column('core_post', 'contenu', self.gf('django.db.models.fields.CharField')(max_length=300))

    def backwards(self, orm):
        # Deleting model 'Pays'
        db.delete_table('core_pays')

        # Deleting model 'Domaine'
        db.delete_table('core_domaine')

        # Deleting field 'Post.domaine'
        db.delete_column('core_post', 'domaine_id')

        # Deleting field 'Post.date_creation'
        db.delete_column('core_post', 'date_creation')

        # Deleting field 'Post.pays'
        db.delete_column('core_post', 'pays_id')


        # Changing field 'Post.contenu'
        db.alter_column('core_post', 'contenu', self.gf('django.db.models.fields.CharField')(max_length=400))

    models = {
        'core.domaine': {
            'Meta': {'object_name': 'Domaine'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'max_length': '4'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_pays': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.post': {
            'Meta': {'object_name': 'Post'},
            'contenu': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateField', [], {'default': 'datetime.datetime.now', 'auto_now_add': 'True', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Domaine']", 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['core.Pays']", 'null': 'True'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        }
    }

    complete_apps = ['core']