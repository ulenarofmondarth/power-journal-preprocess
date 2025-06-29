Environment
===========

Servers
-------

``pnpm devserve:docs`` will start a server that builds and serves the documentation for this project in a local docker container. You can configure the port that this server uses in ``scripts/config/defaults.json``.

``pnpm serve:vtt`` will start a Foundry VTT server. This can be used to support the ``vite dev`` server.

``pnpm dev`` will start ``vite dev``. This expects the main Foundry serves to be running (``pnpm serve:vtt``).

Testing
-------

``pnpm test`` will run all tests once, then exit.

``pnpm vitest`` will run all tests, then watch for changes, rerunning any tests related to the changed files.


Version Control
---------------

This project uses `husky <https://typicode.github.io/husky/>`_ to manage various :program:`git` scripts. These are used to run formatting, linting, and testing on every commit. They also enforce the use of `conventional commits <https://github.com/conventional-changelog/conventional-changelog>`_ using `commitizen <https://www.npmjs.com/package/commitizen>`_.

All this means that release notes are automatically generated during the ``.github/workflow`` to build and release this module.
