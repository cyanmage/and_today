from django.conf.urls import include, patterns, url
from django.views.generic import TemplateView
from stickit.views import GroupeElementView, StickerView,  CadreView


partial_patterns = patterns('',
    url(r'^motif_sticker_vierge.html$', TemplateView.as_view(template_name="stickit/motif_sticker_vierge.html"), name='motif_sticker_vierge.html'),
    url(r'^motif_sticker.html$',        TemplateView.as_view(template_name="stickit/motif_sticker.html"), name='motif_sticker.html'),
    url(r'^motif_cadre.html$',          TemplateView.as_view(template_name="stickit/motif_cadre.html"  ), name='motif_cadre.html'),
    url(r'^empty.html$',                TemplateView.as_view(template_name="stickit/empty.html"  ), name='empty.html'),
)





urlpatterns = patterns('',
    url(r'^partials/', include(partial_patterns, namespace='partials')),
    url(r'^groupe-elements/(\d{4}-\d{2}-\d{2})/$', GroupeElementView.as_view()),
    url(r'^sticker/(\d+)/$', StickerView.as_view()),
    url(r'^cadre/(\d+)/$', CadreView.as_view()),
)
