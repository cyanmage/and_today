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
            ('opacite', self.gf('django.db.models.fields.DecimalField')(decimal_places=2, max_digits=3)),
            ('couleur_de_fond', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal('core', ['BackGround'])

        # Deleting field 'Cadre.images_de_fond'
        db.delete_column('core_cadre', 'images_de_fond')

        # Adding field 'Cadre.image_de_fond'
        db.add_column('core_cadre', 'image_de_fond',
                      self.gf('django.db.models.fields.TextField')(default=''),
                      keep_default=False)

        # Adding field 'Cadre.left'
        db.add_column('core_cadre', 'left',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)

        # Adding field 'Cadre.top'
        db.add_column('core_cadre', 'top',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)

        # Adding field 'Cadre.width'
        db.add_column('core_cadre', 'width',
                      self.gf('django.db.models.fields.IntegerField')(default=200),
                      keep_default=False)

        # Adding field 'Cadre.height'
        db.add_column('core_cadre', 'height',
                      self.gf('django.db.models.fields.IntegerField')(default=150),
                      keep_default=False)

        # Adding field 'Cadre.opacite'
        db.add_column('core_cadre', 'opacite',
                      self.gf('django.db.models.fields.DecimalField')(default='1', decimal_places=2, max_digits=3),
                      keep_default=False)

        # Deleting field 'PostUser.recopie_tel_quel'
        db.delete_column('core_postuser', 'recopie_tel_quel')


    def backwards(self, orm):
        # Deleting model 'BackGround'
        db.delete_table('core_background')

        # Adding field 'Cadre.images_de_fond'
        db.add_column('core_cadre', 'images_de_fond',
                      self.gf('django.db.models.fields.TextField')(default=''),
                      keep_default=False)

        # Deleting field 'Cadre.image_de_fond'
        db.delete_column('core_cadre', 'image_de_fond')

        # Deleting field 'Cadre.left'
        db.delete_column('core_cadre', 'left')

        # Deleting field 'Cadre.top'
        db.delete_column('core_cadre', 'top')

        # Deleting field 'Cadre.width'
        db.delete_column('core_cadre', 'width')

        # Deleting field 'Cadre.height'
        db.delete_column('core_cadre', 'height')

        # Deleting field 'Cadre.opacite'
        db.delete_column('core_cadre', 'opacite')

        # Adding field 'PostUser.recopie_tel_quel'
        db.add_column('core_postuser', 'recopie_tel_quel',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


    models = {
        'core.background': {
            'Meta': {'object_name': 'BackGround'},
            'couleur_de_fond': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'opacite': ('django.db.models.fields.DecimalField', [], {'decimal_places': '2', 'max_digits': '3'})
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
            'opacite': ('django.db.models.fields.DecimalField', [], {'default': "'1'", 'decimal_places': '2', 'max_digits': '3'}),
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
        'core.postgenerique': {
            'Meta': {'object_name': 'PostGenerique'},
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
        'core.postuser': {
            'Meta': {'object_name': 'PostUser'},
            'contenu': ('django.db.models.fields.TextField', [], {'default': "''"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'height': ('django.db.models.fields.IntegerField', [], {'default': '150'}),
            'heure': ('django.db.models.fields.TimeField', [], {'null': 'True', 'default': 'datetime.datetime(2014, 2, 23, 0, 0)'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'left': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'style': ('django.db.models.fields.TextField', [], {'null': 'True', 'default': "''"}),
            'top': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'width': ('django.db.models.fields.IntegerField', [], {'default': '200'})
        }
    }

    complete_apps = ['core']