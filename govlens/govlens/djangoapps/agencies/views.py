from .models import Agency
from .serializers import AgencySerializer
from rest_framework import generics, viewsets

class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
