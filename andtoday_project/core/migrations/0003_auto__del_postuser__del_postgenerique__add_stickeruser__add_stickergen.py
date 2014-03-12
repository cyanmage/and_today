# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'PostUser'
        db.delete_table('core_postuser')

        # Deleting model 'PostGenerique'
        db.delete_table('core_postgenerique')

        # Adding model 'StickerUser'
        db.create_table('core_stickeruser', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('style', self.gf('django.db.models.fields.TextField')(null=True, default='')),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('heure', self.gf('django.db.models.fields.TimeField')(null=True, default=datetime.datetime(2014, 3, 10, 0, 0))),
        ))
        db.send_create_signal('core', ['StickerUser'])

        # Adding model 'StickerGenerique'
        db.create_table('core_stickergenerique', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('style', self.gf('django.db.models.fields.TextField')(null=True, default='')),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(null=True, default=0, to=orm['core.Pays'])),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(null=True, default=0, to=orm['core.Domaine'])),
        ))
        db.send_create_signal('core', ['StickerGenerique'])


    def backwards(self, orm):
        # Adding model 'PostUser'
        db.create_table('core_postuser', (
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('heure', self.gf('django.db.models.fields.TimeField')(null=True, default=datetime.datetime(2014, 3, 7, 0, 0))),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('style', self.gf('django.db.models.fields.TextField')(null=True, default='')),
        ))
        db.send_create_signal('core', ['PostUser'])

        # Adding model 'PostGenerique'
        db.create_table('core_postgenerique', (
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(null=True, default=0, to=orm['core.Domaine'])),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('left', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('top', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('contenu', self.gf('django.db.models.fields.TextField')(default='')),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('width', self.gf('django.db.models.fields.IntegerField')(default=200)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(null=True, default=0, to=orm['core.Pays'])),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('height', self.gf('django.db.models.fields.IntegerField')(default=150)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('style', self.gf('django.db.models.fields.TextField')(null=True, default='')),
        ))
        db.send_create_signal('core', ['PostGenerique'])

        # Deleting model 'StickerUser'
        db.delete_table('core_stickeruser')

        # Deleting model 'StickerGenerique'
        db.delete_table('core_stickergenerique')


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
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_de_fond': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'opacite': ('django.db.models.fields.DecimalField', [], {'default': '1', 'max_digits': '3', 'decimal_places': '2'}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        },
        'core.domaine': {
            'Meta': {'object_name': 'Domaine', 'ordering': "('intitule_domaine',)"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'intitule_domaine': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'core.pays': {
            'Meta': {'object_name': 'Pays'},
            'code_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '4'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nom_pays': ('django.db.models.fields.CharField', [], {'null': 'True', 'max_length': '50'})
        },
        'core.stickergenerique': {
            'Meta': {'object_name': 'StickerGenerique'},
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'domaine': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'default': '0', 'to': "orm['core.Domaine']"}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'pays': ('django.db.models.fields.related.ForeignKey', [], {'null': 'True', 'default': '0', 'to': "orm['core.Pays']"}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'null': 'True', 'default': "''"}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        },
        'core.stickeruser': {
            'Meta': {'object_name': 'StickerUser'},
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'heure': ('django.db.models.fields.TimeField', [], {'null': 'True', 'default': 'datetime.datetime(2014, 3, 10, 0, 0)'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'style': ('django.db.models.fields.TextField', [], {'null': 'True', 'default': "''"}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        }
    }

    complete_apps = ['core']