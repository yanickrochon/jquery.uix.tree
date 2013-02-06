

New features
------------

Tabs can have option attributes to define their behaviour :

* **data-tabs-options** *(TODO)* : Set on `LI` elements, a list of comma separated options for the generated tab nav. Ex: `"closable, sticky"`.
  * **closable** : the tab will be closable
  * **sticky** : the tab will have visibility priority over other tabs, meaning that if `showMore` is enabled, non-sticky tabs will be hidden first.

Options
-------

* **showMore** : *(boolean: false)* Enable or not the "show more" feature
* **showMoreText** : *(string: "Show more")* The text in the "show more" button
* **showMoreIcons** : *(object: { opened: "ui-icon-triangle-1-s", closed: "ui-icon-triangle-1-e" })* The icons to display when opening the "show more" popup
* **showMoreMaxHeight** : *(numeric: null)* Define the max height of the "show more" popup container (set null for auto height)


Methods
-------

* **activate** *(TODO)* : activate a given tab by index (numeric) or content id (string).


Events
------

* **tabCreated** *(TODO)* : fired when a new tab is created (fired only once per tab)


TODO
----

* Add support for keyboard navigation (make focussed tab-nav visible if not)
