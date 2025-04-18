if
==

Conditional include.

.. code-block::

   {{ if | 1==1 | isTrue | isFalse }}

If the first argument ``1==1`` evaluates to true, then macro expands to the content of the second argument ``isTrue`` otherwise it expands to the third ``isFalse``.

The condition (first argument) is evaluated in the client global context, so you can do anything in this argument you could do in a macro.

.. code-block::

   {{ if | game.actors.contents.length === 1 | Just one actor | Many actors }}

