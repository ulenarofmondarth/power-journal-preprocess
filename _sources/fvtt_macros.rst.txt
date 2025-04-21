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

.. important:: Macros called from Power Journal *must* be synchronous.

All arguments are passed to the macro via the ``scope.args`` field, a ``string[]``.

You can return a simple ``string``, which will be substituted into the output.

You can return an object containing a ``result`` ``string`` and an ``errors`` ``string[]``. Missing ``errors`` defaults to ``[]`` while a missing ``result`` defaults to ``No result``.

This macro is invoked as any other macro.

.. code-block:: txt

   {{"My Macro" | Ulenar of Mondarth }}

.. note:: The quotes around the macro name are required because it contains a space.


.. code-block:: txt
   :caption: Output

   My name is Ulenar of Mondarth
