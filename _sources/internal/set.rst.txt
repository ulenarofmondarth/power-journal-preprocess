.. _internal set macro:
set
===

Set a world scope variable.

.. code-block::

   {{ set | a | some value }}

This sets the variable ``a`` to ``some value``.

The macro expands to the empty string (so it is effectively removed from the output).
