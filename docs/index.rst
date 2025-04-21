Power Journal Enrich Preprocess documentation
=============================================

This is a generalized pre-processor for Foundry VTT ``enrichHTML``, standard enrich functinality remains unchanged and is performed *after* this preprocessing.

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

- A named macro
- A macro UUID
- A module function that has registered with PJE
- One of the built in functions

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   macro_expansion.rst
   macro_arguments.rst
   internal_macros.rst
   fvtt_macros.rst
