from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 't_chartit.views.home', name='home'),
    # url(r'^t_chartit/', include('t_chartit.foo.urls')),
    url(r'^$', include('domotics.urls')),
    url(r'^idreammicro/', include('domotics.urls')),                       

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
