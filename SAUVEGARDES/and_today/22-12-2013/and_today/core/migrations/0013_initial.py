# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'PostUser'
        db.create_table('core_postuser', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('heure', self.gf('django.db.models.fields.TimeField')()),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['auth.User'])),
        ))
        db.send_create_signal('core', ['PostUser'])

        # Adding model 'PostGenerique'
        db.create_table('core_postgenerique', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contenu', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('date', self.gf('django.db.models.fields.DateField')()),
            ('journee_generique', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('recopie_tel_quel', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_creation', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, default=datetime.datetime.now, blank=True)),
            ('inactif', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date_modification', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime.now, blank=True)),
            ('pays', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Pays'], null=True)),
            ('domaine', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['core.Domaine'], null=True)),
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
            ('code_pays', self.gf('django.db.models.fields.CharField')(null=True, max_length=4)),
            ('nom_pays', self.gf('django.db.models.fields.CharField')(null=True, max_length=50)),
        ))
        db.send_create_signal('core', ['Pays'])


    def backwards(self, orm):
        # Deleting model 'PostUser'
        db.delete_table('core_postuser')

        # Deleting model 'PostGenerique'
        db.delete_table('core_postgenerique')

        # Deleting model 'Domaine'
        db.delete_table('core_domaine')

        # Deleting model 'Pays'
        db.delete_table('core_pays')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '80', 'unique': 'True'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'related_name': "'user_set'", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'related_name': "'user_set'", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '30', 'unique': 'True'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
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
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
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
            'date_creation': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'date_modification': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'default': 'datetime.datetime.now', 'blank': 'True'}),
            'heure': ('django.db.models.fields.TimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'inactif': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'journee_generique': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'recopie_tel_quel': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'default': '1', 'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['core']