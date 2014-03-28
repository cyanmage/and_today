from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'andtoday_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', include('core.urls')),
    url(r'^stockeImage/', include('uploadFiles.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^stickit/', include('stickit.urls')),
)



from django.conf import settings

urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)