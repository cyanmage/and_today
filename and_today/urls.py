from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'and_today.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^$', 'core.views.home'),
    url(r'^defilement_infini/', include('defilement_infini.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
