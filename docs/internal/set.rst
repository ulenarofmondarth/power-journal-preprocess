.. _internal set macro:
set
===

Set a world scope variable.

.. code-block::

   {{ set | a | some value }}

This sets the variable ``a`` to ``some value``. These variables are stored in the world (so they will persist between sessions).

The macro expands to the empty string (so it is effectively removed from the output).

Variable names
--------------

Variable names are simple strings. They can contain spaces but, as with any argument, spaces before/after the first non-whitespace are removed.

Variable values
---------------

All variables store their value as a string.
