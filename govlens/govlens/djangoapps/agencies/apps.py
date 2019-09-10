from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AgenciesConfig(AppConfig):
    name = "govlens.agencies"
    verbose_name = _("Agencies")

    def ready(self):
        try:
            import govlens.agencies.signals  # noqa F401
        except ImportError:
            pass
