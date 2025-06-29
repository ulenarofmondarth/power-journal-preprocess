Setup
=====

Once the :ref:`prerequisites` are installed setup is simple enough.

.. code-block

   git clone https://github.com/ulenarofmondarth/power-journal-preprocess.git
   cd power-journal-preprocess
   pnpm install


In ``.foundryvtt`` create a file ``secrets.json``, this holds information used to start the Foundry server.

.. code-block::
   :caption: secrets.json

   {
     "foundry_admin_key": "",
     "foundry_username": "",
     "foundry_passworc": "",
     "foundry_license_key": ""
   }

``foundry_admin_key``
  This is the administrator key that you use to connect to the server's setup screen.
``foundry_username``
  Your https://foundryvtt.com username (for the account that you used to purchase the license).
``foundry_pasword``
  Your https://foundryvtt.com password.
``foundry_license_key``
  The license key to be ued when activating the Foundry VTT server. This key must be present in the account you specify with ``foundry_username``/``foundry_password``.

You may want to edit the ``VERSION`` environment variable in ``.foundryvtt/.env``. This determines which version of Foundry VTT will be run by the ``pnpm serve:vtt`` script.

And you should be good to go.

