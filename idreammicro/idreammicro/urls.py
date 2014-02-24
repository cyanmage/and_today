from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'idreammicro.views.home', name='home'),
    # url(r'^idreammicro/', include('idreammicro.foo.urls')),

    url(r'^$', 'helloworld.views.index'),
    url(r'^helloworld/$', 'helloworld.views.index'),                  

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
