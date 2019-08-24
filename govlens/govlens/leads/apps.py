from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class LeadsConfig(AppConfig):
    name = "govlens.leads"
    verbose_name = _("Leads")

    def ready(self):
        try:
            import govlens.leads.signals  # noqa F401
        except ImportError:
            pass
