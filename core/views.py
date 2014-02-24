# Create your views here.
from django.shortcuts import render, render_to_response
from django.template import RequestContext
import datetime
from core.models import PostGenerique, Cadre



def home(request):
    #import pdb; pdb.set_trace()
    today = datetime.date.today()
    one_day =  datetime.timedelta(days=1)
    tomorrow = today + one_day
    yesterday = today - one_day
    print(yesterday, today, tomorrow, sep="\n")

    #####METHODE BOURRINE --------------> A AMELIORER !!!! 6 requêtes SQL ???!!!??? ######
    stickers_today = PostGenerique.objects.filter(date = today)
    stickers_yesterday = PostGenerique.objects.filter(date = yesterday)
    stickers_tomorrow = PostGenerique.objects.filter(date = tomorrow)
    cadres_today = Cadre.objects.filter(date = today)
    cadres_yesterday = Cadre.objects.filter(date = yesterday)
    cadres_tomorrow = Cadre.objects.filter(date = tomorrow)
    print (len(stickers_yesterday), len(stickers_today), len(stickers_tomorrow), sep = "***")
    ##########################################################################################""

    #context = request
    return render(request, "core/index.html", {
                                      'stickers_yesterday' : stickers_yesterday,
                                      'stickers_today' : stickers_today,
                                      'stickers_tomorrow' : stickers_tomorrow,
                                      'cadres_yesterday' : cadres_yesterday,
                                      'cadres_today' : cadres_today,
                                      'cadres_tomorrow' : cadres_tomorrow,
                                      'yesterday' : yesterday.isoformat(),
                                      'today' : today.isoformat(),
                                      'tomorrow' : tomorrow.isoformat()
                                      })
    #return render(request, "core/index.html" )
