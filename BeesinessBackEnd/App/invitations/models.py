from django.db import models
from App.workers.models import CustomUser
from App.Colony.models import project
# Create your models here.
class invite(models.Model):
    invitor = models.ForeignKey(CustomUser, related_name='invitation_sender', on_delete=models.DO_NOTHING)
    invitee = models.ForeignKey(CustomUser, related_name='invitation_reciever', on_delete=models.DO_NOTHING)
    projectname = models.CharField(max_length=255, blank=True)
    status = models.BooleanField(default=False)
    