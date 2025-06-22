Scripts
=======

To maintain consistency most scripts in ``package.json`` are implemented as Javascript scripts under the ``scripts`` directory. These scripts load configuration from the ``scripts/config`` directory and the user's data directory (under ``zx``).

Each script is a ``zx`` script (``zx`` is installed as a devDependency).
