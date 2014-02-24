from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tdb.views.home', name='home'),
    # url(r'^tdb/', include('tdb.foo.urls')),
    # url(r'^$', 'core.views.home', name='home'),


    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^initialisation/$', 'core.views.initialisation_des_donnees'),                      
    url(r'^emploidutemps/', include('emploidutemps.urls')),
    url(r'^classes/$', 'core.views.classe'),
    url(r'^$', include('core.urls')),
)
