from django.conf.urls import include, patterns, url
from django.views.generic import TemplateView


partial_patterns = patterns('',
    url(r'^motif_sticker.html$', TemplateView.as_view(template_name="motif_sticker.html"), name='motif_sticker.html'),
)





urlpatterns = patterns('',
    url(r'^partials/', include(partial_patterns, namespace='partials')),
)
