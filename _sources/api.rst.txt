API
===

If you are developing a module, a simple API is provided.

Wait on the ``mondarth-power-journal-preprocesReady`` hook, then use the API ``registerMacro`` function to register your module's preprocess macro.

.. important:: Preprocess macro function's must be synchronous.

.. code-block:: typescript

   function coolMacro(makeThisCool: string): {result: string, errors: string[]} {
     return { result: `This is cool ${makeThisCool}.`, errors: []}
   }

   Hooks.on('mondarth-power-journal-preprocessReady', (api) => {
     api.registerMacro('my-module', 'cool', coolMacro)
   })

Replacing ``my-module`` with your module's id.

This macro would then be available as:

.. code-block::

   {{ cool | was dull }}

This would be rendered as:

.. code-block:: txt

   This is cool was dull.


.. note:: Module macros will override internal macros. The order of precedence among modules depends on the order in which they register their first macro\ [#F1]_


.. rubric:: Footnotes

.. [#F1] The first time a macro is registered by a module a table is created to hold that module's macros. This means that modules that register their first macro later will override earlier modules.
   
