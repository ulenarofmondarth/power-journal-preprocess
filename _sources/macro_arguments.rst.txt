Macro Arguments
===============


Argument separator
------------------

The first non-space character after the macro name is assumed to be the argument separator (unless it is one of ``'"/``, see :ref:`Complex separators`)

.. code-block:: txt

   {{ fn1 | arg1 | arg2 }}

   {{ fn2 ,arg1,arg2}}

``fn1`` has two arguments separated by the ``|`` character.

``fn2`` has two arguments separated by the ``,`` character.

.. tip:: It is best to stick with ``|`` as a seprator unless you have a specific need to use something else. This character is not common in HTML (the most likely format returned by macros).

.. _Complex separators:
Complex Separators
~~~~~~~~~~~~~~~~~~

Because macros expand fully into their parent before arguments are identified it can be difficult to choose a single character argument separator.

.. rubric:: Example

Suppose the ``page`` macro expands a page into the current context. There is no reliable way to ensure that the ``|`` character (or any single character) will not appear in the resulting text so the following may not expand as expected.

.. code-block:: txt

   {{"My Macro" | {{page | SomeUUID }} | arg2 }}

If the page at ``SomeUUID`` expands and contains a ``|`` then ``My Macro`` will get more than the two arguments it expects (additional arguments will be passed to ``My Macro`` but it may not process them).

.. note:: The ``page`` macro itself will work fine as the ``|`` will have already served its purpose before the expansion occurs.

To work around these cases you can specify a more complex (and hopefully unique) separator using a quoted string or a `regex <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions>`_ (enclosed in ``//``).

.. code-block:: txt

   {{"My Macro" "-Sep-" {{page | SomeUUID}} -Sep- arg2 }}

   {{"My Macro" /-{3}/ {{page | SomeUUID}} --- arg2 }}

In the first example, the ``"-Sep-"`` specifies the string ``-Sep-`` is used to separate arguments in the "My Macro" macro.

The second example specifies a regular expression ``-{3}``, so three ``-`` characters are considered to be an argument separator.

.. note:: Subsequent separators are not quoted.

.. tip:: Another way around this is to defer to standard enrichers. In the case of expandind a page we can use the `Page <https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal#page>`_ enricher from `Lyynix: More Journal Enrichers <https://foundryvtt.com/packages/lyynix-more-journal-enrichers>`_ package.

   .. code-block:: txt

      {{"My Macro" | @Page[SomeUUID] }}

   This *does not* expand the page into the ``My Macro`` arguments. The string ``@Page[SomeUUID]`` is passed to ``My Macro`` and will only be expanded if it is output by ``My Macro``. Remember, the enrichers are run on the output after this preprocessor runs.
  
   So, if ``My Macro`` needs to operate on the content of the page use the complex separator. If ``My Macro`` simple determines if ``@Page[SomeUUID]`` is included in the output or not then use the enricher method.

