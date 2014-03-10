# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'BackGround'
        db.create_table('core_background', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('opacite', self.gf('django.db.models.fields.DecimalField')(default=1, max_digits=3, decimal_places=2)),
            ('couleur_de_fond', self.gf('django.db.models.fields.TextField')(default='#ffffff')),
        ))
        db.send_create_signal('core', ['BackGround'])

        # Adding model 'Cadre'
        db.create_table('core_cadre', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('image_de_fond', self.gf('django.db.models.fields.TextField')(default='')),
            ('couleur_de_fond', self.gf('django.db.models.fields.TextField')(default='#FFFFFF')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now_add=True, blank=True)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now=True, blank=True)),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('opacite', self.gf('django.db.models.fields.DecimalField')(default=1, max_digits=3, decimal_places=2)),
        ))
        db.send_create_signal('core', ['Cadre'])

        # Adding model 'PostUser'
        db.create_table('core_postuser', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now_add=True, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now=True, blank=True)),
            ('style', self.gf('django.db.models.fields.TextField')(default='', null=True)),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('heure', self.gf('django.db.models.fields.TimeField')(default=datetime.datetime(2014, 3, 7, 0, 0), null=True)),
        ))
        db.send_create_signal('core', ['PostUser'])

        # Adding model 'PostGenerique'
        db.create_table('core_postgenerique', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now_add=True, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now, auto_now=True, blank=True)),
            ('style', self.gf('django.db.models.fields.TextField')(default='', null=True)),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(default=0, to=orm['core.Pays'], null=True)),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(default=0, to=orm['core.Domaine'], null=True)),
        ))
        db.send_create_signal('core', ['PostGenerique'])

        # Adding model 'Domaine'
        db.create_table('core_domaine', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('intitule_domaine', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('core', ['Domaine'])

        # Adding model 'Pays'
        db.create_table('core_pays', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('code_pays', self.gf('django.db.models.fields.CharField')(max_length=4, null=True)),
            ('nom_pays', self.gf('django.db.models.fields.CharField')(max_length=50, null=True)),
        ))
        db.send_create_signal('core', ['Pays'])


    def backwards(self, orm):
        # Deleting model 'BackGround'
        db.delete_table('core_background')

        # Deleting model 'Cadre'
        db.delete_table('core_cadre')

        # Deleting model 'PostUser'
        db.delete_table('core_postuser')

        # Deleting model 'PostGenerique'
        db.delete_table('core_postgenerique')

        # Deleting model 'Domaine'
        db.delete_table('core_domaine')

        # Deleting model 'Pays'
        db.delete_table('core_pays')


    models = {
        'core.background': {
            'Meta': {'object_name': 'BackGround'},
            'couleur_de_fond': ('django.db.models.fields.TextField', [], {'default': "'#ffffff'"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'opacite': ('django.db.models.fields.DecimalField', [], {'default': '1', 'max_digits': '3', 'decimal_places': '2'})
        },
        'core.cadre': {
            'Meta': {'object_name': 'Cadre'},
            'couleur_de_fond': ('django.db.models.fields.TextField', [], {'default': "'#FFFFFF'"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now_add': 'True', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_de_fond': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'opacite': ('django.db.models.fields.DecimalField', [], {'default': '1', 'max_digits': '3', 'decimal_places': '2'}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        },
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
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now_add': 'True', 'blank': 'True'}),
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
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now_add': 'True', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'auto_now': 'True', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'heure': ('django.db.models.fields.TimeField', [], {'default': 'datetime.datetime(2014, 3, 7, 0, 0)', 'null': 'True'}),
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