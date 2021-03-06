Gov Lens Template
=================

Behold Gov Lens Template

.. image:: https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg
     :target: https://github.com/pydanny/cookiecutter-django/
     :alt: Built with Cookiecutter Django
.. image:: https://img.shields.io/badge/code%20style-black-000000.svg
     :target: https://github.com/ambv/black
     :alt: Black code style


:License: MIT

Setup
--------

Added by Lawrence McDaniel (lpm0073). These are my own work notes from 24-August
to get the Cookie Cutter scaffolded project up and running in my local
development environment which, in my case, is a MacBook Pro.

The Cookiecutter-Django online documentation is really good. I mostly
followed the step-by-step instructions here: https://cookiecutter-django.readthedocs.io/en/latest/developing-locally.html
In my case I had some challenges getting Postgres to work. I had to install it,
which I elected to do via Homebrew. Like most database server technology, it was
neither seamless nor turnkey. alas. :/

::

    cd <project directory>

    # create a virtual environment on your local machine
    python3.6 -m venv .

    # activate the virtual environment
    source ./bin/activate

    # install the project requirements locally
    pip install -r requirements/local.txt


    # optional for mac os: install postgres locally using Homebrew
    brew install postgres
    /usr/local/opt/postgres/bin/createuser -s postgres
    pg_ctl -D /usr/local/var/postgres start
    # or if you prefer: brew services start postgresql

    # create a local database
    createdb govlens -U postgres --password govlens


    # set Django's environment variable to the local db
    export DATABASE_URL=postgres://postgres:govlens@127.0.0.1:5432/govlens

    # set Celery broker URL
    export CELERY_BROKER_URL=redis://localhost:6379/0

    # install node modules
    npm install

    # run webpack to load React components
    npm run dev


Settings
--------

Moved to settings_.

.. _settings: http://cookiecutter-django.readthedocs.io/en/latest/settings.html

Basic Commands
--------------

Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

* To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

* To create an **superuser account**, use this command::

    $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

Type checks
^^^^^^^^^^^

Running type checks with mypy:

::

  $ mypy govlens

Test coverage
^^^^^^^^^^^^^

To run the tests, check your test coverage, and generate an HTML coverage report::

    $ coverage run -m pytest
    $ coverage html
    $ open htmlcov/index.html

Running tests with py.test
~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  $ pytest

Live reloading and Sass CSS compilation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Moved to `Live reloading and SASS compilation`_.

.. _`Live reloading and SASS compilation`: http://cookiecutter-django.readthedocs.io/en/latest/live-reloading-and-sass-compilation.html



Celery
^^^^^^

This app comes with Celery.

To run a celery worker:

.. code-block:: bash

    cd govlens
    celery -A config.celery_app worker -l info

Please note: For Celery's import magic to work, it is important *where* the celery commands are run. If you are in the same folder with *manage.py*, you should be right.





Sentry
^^^^^^

Sentry is an error logging aggregator service. You can sign up for a free account at  https://sentry.io/signup/?code=cookiecutter  or download and host it yourself.
The system is setup with reasonable defaults, including 404 logging and integration with the WSGI application.

You must set the DSN url in production.


Deployment
----------

The following details how to deploy this application.
