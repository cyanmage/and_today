from django.contrib import admin 
from core.models import Domaine, PostUser, PostGenerique, Post, Pays
from django import forms 
from django.db import models
import datetime






    

class PostAdminModelForm(forms.ModelForm) :
	contenu = forms.CharField(widget=forms.Textarea(attrs={'cols':80, 'rows':3}))
	date = forms.DateField(widget=forms.DateInput(format = '%d/%m/%Y'), input_formats = ("%d-%m-%Y", "%d/%m/%Y"))

	class meta:
		model = Post 
		fields = []




class PostAdmin(admin.ModelAdmin):

	def date_affichee(self, instance):
		return instance.date.strftime("%d %b %Y")	
	date_affichee.short_description = "date de l'évènement"
	date_affichee.admin_order_field = 'date'

	def date_creation_affichee(self, instance):
		return 	instance.date_creation.strftime("%d %b %Y à %H:%M:%S")	
	date_creation_affichee.short_description = "date de création du Post"	


class PostUserAdmin(PostAdmin):
	list_display = ('date_affichee', 'heure',  'contenu', 'journee_generique', 'recopie_tel_quel', 'inactif', 'date_creation_affichee')
	ordering = ('date', 'contenu',)
	form = PostAdminModelForm	

	fieldsets = [
				(None, 								{'fields' : ['contenu']}),
				('Catégories', 						{'fields' : ['date']}),
				('Gestion interne', 				{'fields' : ['journee_generique', 'recopie_tel_quel', 'inactif'], 'classes': ['collapse']}),
	]	
	list_filter = ('journee_generique', 'recopie_tel_quel', 'inactif')	
	search_fields  = ("contenu",)



class PostGeneriqueAdmin(PostAdmin):
	list_display = ('date_affichee', 'contenu', 'domaine', 'pays', 'journee_generique', 'recopie_tel_quel', 'inactif', 'date_creation_affichee')
	radio_fields = {"domaine": admin.HORIZONTAL}
	#list_editable = ('contenu', )
	#list_display_links = ('date', "domaine_name", )
	list_filter = ('domaine__intitule_domaine', 'pays', 'journee_generique', 'recopie_tel_quel', 'inactif')
	ordering = ('date', 'contenu', 'domaine', )
	search_fields  = ("contenu",)
	form = PostAdminModelForm

	fieldsets = [
				(None, 								{'fields' : ['contenu']}),
				('Catégories', 						{'fields' : ['date', 'domaine', 'pays']}),
				('Gestion interne', 				{'fields' : ['journee_generique', 'recopie_tel_quel', 'inactif'], 'classes': ['collapse']}),
	]	
	"""
	formfield_overrides = { models.CharField :  
											{ 
												'widget' : forms.Textarea(attrs={'cols':80, 'rows':3})
												},
							}
							"""


		

	#def domaine_name(self, instance):
	#	return instance.domaine.intitule_domaine


admin.site.register(Domaine)
admin.site.register(Pays)
admin.site.register(PostUser, PostUserAdmin)
admin.site.register(PostGenerique, PostGeneriqueAdmin)

