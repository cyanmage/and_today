from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'and_today.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^$', 'core.views.home'),
    url(r'^$', include('core.urls')),
    url(r'^controleSticker/', include('controleSticker.urls')),
    url(r'^stockeImage/', include('dnd_upload.urls')),
    url(r'^stickit/', include('stickit.urls')),
    url(r'^admin/', include(admin.site.urls)),
)



from django.conf import settings

urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)