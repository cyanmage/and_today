from django.contrib import admin 
from core.models import Domaine, Post
from django import forms 
from django.db import models



admin.site.register(Domaine)


    

class PostAdminModelForm(forms.ModelForm) :
	contenu = forms.CharField(widget=forms.Textarea(attrs={'cols':80, 'rows':3}))
	date = forms.DateField(widget=forms.DateInput(format = '%d/%m/%Y'), input_formats = ("%d-%m-%Y", "%d/%m/%Y"))
	class meta:
		model = Post 
		fields = []


class PostAdmin(admin.ModelAdmin):
	list_display = ('date', 'contenu',  'domaine', );
	#list_editable = ('contenu', )
	#list_display_links = ('date', "domaine_name", )
	list_filter = ('domaine__intitule_domaine', 'contenu', 'date',)
	ordering = ('date', 'contenu', )
	form = PostAdminModelForm
	"""
	formfield_overrides = { models.CharField :  
											{ 
												'widget' : forms.Textarea(attrs={'cols':80, 'rows':3})
												},
							}
							"""

						

	#def domaine_name(self, instance):
	#	return instance.domaine.intitule_domaine


admin.site.register(Post, PostAdmin)