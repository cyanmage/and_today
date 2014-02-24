# Create your views here.
from django.shortcuts import render
from django.template import RequestContext

def home(request):
    #context = request
    #return render_to_response("core/index.html", context_instance=RequestContext(request))
        return render(request, "core/index.html")
