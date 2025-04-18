Macro Expansion
===============

Macros are expanded 'deepest first'.

.. code-block::

   {{fn1 | {{fn2 | {{fn3}} }} }}

Will expand ``fn3`` |then| ``fn2`` |then| ``fn1``.

Macros work over multiple lines.

Macros *will* reprocess expanded text. So, if ``fn3`` in the previous example returned the text ``{{ fn4 }}`` then ``fn4`` will be run and its expansion returned.

For example:

.. code-block::

   {{ fn1 | {{ fn2 }} }}

Because ``{{ fn2 }}`` will expand before ``fn1``, if it returns ``arg1`` then the outer macro becomes ``{{ fn1 | arg1 }}``.

.. note:: If ``fn2`` had returned ``{{ fn3 }}`` then this would be evaluated. If ``fn3`` expanded to ``Hello World!`` then outer macro would be ``{{ fn1 | Hello World! }}``.


Suppose we have:

.. code-block::
   :caption: fn3 returns...

   This is fn3

.. code-block::
   :caption: fn2 returns...

   My first arg is <arg1>

Where ``<arg1>`` is whatever appears between the ``|`` and the ``}}`` (in thise instance this will be whatever ``fn3`` returns).

.. code-block::
   :caption: fn1 returns...

   Finally
     Something else <arg1>

.. code-block::
   :caption: final output...

   Finally
     Something else My first arg is This is fn3

Whitespace
----------

Whitespace is trimmed when the macro name and arguments are identified.

No whitespace it trimmed from macro return values.

Macro Names
~~~~~~~~~~~

It if common for Foundry macro names to contain spaces. To allow for this you can include the macro name in quotes (single of double).

.. code-block::

   {{"A Macro Name" | arg1 }}
   
Here the macro named ``A Macro Name`` will be called, passing ``arg1`` as the single argument.

The space either side of ``arg1`` will be ignored and excluded from final output.
