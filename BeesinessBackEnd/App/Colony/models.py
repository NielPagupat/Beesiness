from django.db import models
from App.workers.models import CustomUser 
from django.conf import settings
# Create your models here.
class project(models.Model):
    creator = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    projectName = models.CharField(max_length=255, unique=True)
    projectCreated = models.DateTimeField(auto_now=True)
    members = models.JSONField(null=True)
    

    def __str__(self) -> str:
        return '{}-{}'.format(self.creator, self.projectName)
    
class comment(models.Model):
    leader = models.CharField(blank=True, max_length=255)
    reciever = models.CharField(blank=True, max_length=255)
    content = models.CharField(blank=True, max_length=255)
    project = models.ForeignKey(project, on_delete=models.CASCADE)