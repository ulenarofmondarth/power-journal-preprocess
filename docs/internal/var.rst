var
===


Recalls a world scope variable reviously set with :ref:`set <internal set macro>`.

.. code-block::

   {{ var | a }}

Expands to the value assigned to ``a`` or (if ``a`` has not been set, an empty string).


.. code-block::

   {{ set | a | apples }}{{ var | a }}

Sets the variable ``a`` to ``apples`` then renders it to the output.
