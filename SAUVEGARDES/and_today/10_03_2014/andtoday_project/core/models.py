from django.db import models
from django.utils.translation import ugettext_lazy as _
from datetime import datetime
from django.contrib.auth.models import User 

# Create your models here.



#def between0and1(value):
#	if (value > 1 or value < 0):
#		raise ValidationError(_("La valeur de l'"))

class BackGround(models.Model):
	"""docstring for BackGround"""
	"""Champs : couleur et opacité du cadre global """	

	class Meta:
		verbose_name = _('BackGround')
		verbose_name_plural = _('BackGrounds')

	opacite		 			= models.DecimalField(max_digits=3, decimal_places=2, default=1)	
	couleur_de_fond			= models.TextField(default="#ffffff")

	def __str__(self):
		pass


class Cadre(models.Model):
	"""docstring for Cadre"""
	"""Champs : couleur_de_fond, images_de_fond(uniquement sous forme HTML) """
	class Meta:
		verbose_name = _('Cadre')
		verbose_name_plural = _('Cadres')

	image_de_fond		= models.TextField(default="")
	couleur_de_fond		= models.TextField(default="#FFFFFF")
	date 				= models.DateField(null=False)
	date_creation  		= models.DateTimeField(auto_now_add=True, default=datetime.now) 
	date_modification  	= models.DateTimeField(auto_now=True, default=datetime.now)
	left  				= models.IntegerField(default=0)	
	top 				= models.IntegerField(default=0)	
	width  				= models.IntegerField(default=200)
	height  			= models.IntegerField(default=150)
	opacite 			= models.DecimalField(max_digits=3, decimal_places=2, default=1)		

	def __str__(self):
		pass


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
	date 				= models.DateField(null=False)
	journee_generique	= models.BooleanField(default=False)
	date_creation  		= models.DateTimeField(auto_now_add=True, default=datetime.now) 
	inactif  			= models.BooleanField(default=False)
	date_modification  	= models.DateTimeField(auto_now=True, default=datetime.now)
	style 				= models.TextField(default="", null=True)
	left  				= models.IntegerField(default=0)	
	top 				= models.IntegerField(default=0)	
	width  				= models.IntegerField(default=200)
	height  			= models.IntegerField(default=150)	
	recopie_tel_quel 	= models.BooleanField(default=False)

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

	def __str__(self):
		return "" + self.nom_pays

	code_pays 		= models.CharField(max_length=4, null=True)
	nom_pays 		= models.CharField(max_length=50, null=True)
