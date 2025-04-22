Foundry Macros
==============

You can use macros defined in Foundry.

.. rubric:: Example

Define a macro in Foundry named ``My Macro``.

.. code-block:: javascript
   :caption: My Macro

   let name = scope?.args?.[0]

   if (name) {
     return `My name is ${name}`
   }
   else {
     return { result: 'No name', errors: ['No name provided']}
   }

.. important:: Macros called from Power Journal Preprocess *must* be synchronous.

.. important:: Foundry macros are looked up before internal macros. This means you can redefined internal macros by creating an appropirately named Foundry macro.

   .. rubric:: Example

   Define a Foundry macro named ``if``.

   .. code-block:: txt
      
      return 'override internal if'
   
   Any use of ``{{if }}`` will expand to ``override internal if`` without further processing.
  
   Remove or rename the Foundry macro to restore the internal ``if``.

Arguments
---------

All arguments are passed to the macro via the ``scope.args`` field, a ``string[]``.

Return values
-------------

You can return a simple ``string``, which will be substituted into the output.

You can return an object containing a ``result`` ``string`` and an ``errors`` ``string[]``. Missing ``errors`` defaults to ``[]`` while a missing ``result`` defaults to ``No result``.

Identifying macros
------------------

Foundry macros can be identified by name or UUID.

Using a name
~~~~~~~~~~~~

This macro is invoked as any other macro.

.. code-block:: txt

   {{"My Macro" | Ulenar of Mondarth }}

.. note:: The quotes around the macro name are required because it contains a space.


.. code-block:: txt
   :caption: Output

   My name is Ulenar of Mondarth


Using UUID
~~~~~~~~~~

Macros can also be referenced by their UUID.

.. code-block::

   {{Compendium.world.some-comp.Macro.ugYqzfXjn81JQ1U2 | Tess}}

Assuming we put the ``My Macro`` macro into a compendium this preprocess macro will use that compendium version and the output will be as follows.

.. code-block::
   :caption: Output

   My name is Tess

