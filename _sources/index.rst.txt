Power Journal Enrich Preprocess documentation
=============================================

This is a generalized pre-processor for Foundry VTT ``enrichHTML``, standard enrich functionality remains unchanged and is performed *after* this preprocessing.

Basic form
----------

.. code-block::

   {{fn | arg1 | arg2 }}

The function ``fn`` is called with ``args``, returned expansion is inlined.

These 'macros' can be nested:

.. code-block::

   {{fn1 | {{fn2 | arg1}} }}

``fn2`` will be invoked with ``arg2`` as an argument. The result will inline and become the argument for ``fn1``.

A ``fn`` can be:

- A Foundry macro (either name or UUID)
- A module function that has registered with PJE using the API.
- One of the built in functions

The above is also the order of precedence. Foundry Macro will override a module function, and both will override a built-in function.

Limitations
-----------

These preprocess steps are only executed when HTML is first rendered.

This means that, for example, a journal page may need to be reloaded to get the correct state. Suppose your page contained the following.

.. code-block::

   {{ if | {{var: fightHappened }} | The fight happened. | The fight has yet to happen. }}

Assuming the ``fightHappened`` variable is ``false`` when we first open the journal we will see ``The fight has yet to happen.``. In another dialog the variable is updated and is now ``true``, the open journal page will not change. To get the journal page to update you need to re-render it (open and close the journal, switch to another page and back, etc.).

Issues
------

Macros in Compendium
~~~~~~~~~~~~~~~~~~~~

While the current pre-processor does not ban using macros via Compenidium UUID it will cause an `issue <https://github.com/ulenarofmondarth/power-journal-preprocess/issues/1>`_.

Basically, these macros will not expand the first time they are rendered and you will need to reload the page they appear on. It is better to load them in to the world and use them directly.

Runaway expansion
~~~~~~~~~~~~~~~~~

You can create runaway expansions, the pre-processor does only very simple tracking of expansions. The following would cause problems.

Define a macro ``deep``.

.. code-block::
   :caption: deep

   return '{{ deep }}'

And create a journal page containing ``{{ deep }}``. ``{{ deep }}`` will expand to ``{{ deep }}``, which will be processed... Well, hopefully you see the problem.

To mitigate this problem there is a limit to the number of times any one function can be expanded in any given preprocess run. Currently ``100``.

.. todo:: Make expansion limit a setting.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   macro_expansion.rst
   macro_arguments.rst
   internal_macros.rst
   fvtt_macros.rst

.. toctree::
   :maxdepth: 2
   :caption: For Developers:

   developers/environment.rst
   developers/scripts.rst
