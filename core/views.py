# Create your views here.
from django.shortcuts import render, render_to_response
from django.template import RequestContext
import datetime
from core.models import PostGenerique








def home(request):
    #import pdb; pdb.set_trace()
    today = datetime.date.today()
    one_day =  datetime.timedelta(days=1)
    tomorrow = today + one_day
    yesterday = today - one_day
    print(yesterday.strftime("%d/%m/%Y"), today, tomorrow, sep="\n")
    stickers_today = PostGenerique.objects.filter(date = today)
    stickers_yesterday = PostGenerique.objects.filter(date = yesterday)
    stickers_tomorrow = PostGenerique.objects.filter(date = tomorrow)
    print (len(stickers_yesterday), len(stickers_today), len(stickers_tomorrow), sep = "***")
    #context = request
    return render(request, "core/index.html", {'stickers_yesterday' : stickers_yesterday,
                                      'stickers_today' : stickers_today,
                                      'stickers_tomorrow' : stickers_tomorrow
                                      })
    #return render(request, "core/index.html" )
