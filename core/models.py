from django.db import models
from django.utils.translation import ugettext_lazy as _
from datetime import datetime    
from django.contrib.auth.models import User


# Create your models here



class Post(models.Model):
	"""docstring for Post"""
	"""Champs : contenu, domaine et date"""

	class Meta:
		verbose_name = _('Post')
		verbose_name_plural = _('Posts')
		abstract = True

	def __str__(self):
		return "Date : " +  self.date.strftime('%d %b %Y') + "   , contenu tronqué : " + self.contenu[:9]

	contenu 			= models.TextField(default="")
	date 				= models.DateField(null = False)
	journee_generique	= models.BooleanField(default=False)
	recopie_tel_quel 	= models.BooleanField(default=False)
	date_creation  		= models.DateTimeField(auto_now_add=True, default=datetime.now) 
	inactif  			= models.BooleanField(default=False)
	date_modification  	= models.DateTimeField(auto_now=True, default=datetime.now)
	style 				= models.TextField(default = "", null = True)
	left  				= models.IntegerField(default = 0)	
	top 				= models.IntegerField(default = 0)	
	width  				= models.IntegerField(default = 200)
	height  			= models.IntegerField(default = 150)	


class PostUser(Post):
	heure 				= models.TimeField(null=True, default=datetime.now())
	#user  				= models.ForeignKey(User, default = User.objects.get(username="no-user").id)
	#permissions	

	def __str__(self):
		return "Date : " +  self.date.strftime('%d %b %Y') + "   , contenu tronqué : " + self.contenu[:9]

	class Meta : 
		verbose_name 		= _('Post utilisateur')
		verbose_name_plural = _('Posts de l\'utilisateur')



class PostGenerique(Post):
	pays  				= models.ForeignKey('Pays', null=True, default=0)
	domaine 			= models.ForeignKey('Domaine', null=True, default = 0) 

	def __str__(self):
		#return "999999999999999"
		return "Date : " +  self.date.strftime('%d %b %Y') \
		+ "    , domaine : " + self.domaine.intitule_domaine \
		+ "   , contenu tronqué : " + self.contenu[:9]

	class Meta: 
		verbose_name 		= _('Post générique') 
		verbose_name_plural = _('Posts génériques') 



class Domaine(models.Model):
	"""docstring for Domaine"""
	"""Domaines possibles : sciences, histoire-géographie, people, mon-histoire"""

	class Meta:
		verbose_name = _('Domaine')
		verbose_name_plural = _('Domaines')
		ordering = ('intitule_domaine',)

	def __str__(self):
		return self.intitule_domaine
 

	intitule_domaine = models.CharField(max_length=50)   


class Pays(models.Model):
	class Meta:
		verbose_name = _('Pays')
		verbose_name_plural = _('Pays')

	def __unicode__(self):
		return "" + self.nom_pays

	code_pays 		= models.CharField(max_length=4, null=True)
	nom_pays 		= models.CharField(max_length=50, null=True)


   

