API
===


Optoins
-------

* **icons** *(object)* : define the node expanded (default: `ui-icon-triangle-1-se`) and collapsed (default: `ui-icon-triangle-1-e`) icons node handles
* **hide** *(boolean, number, string, object}* : define the default hide behaviour (default: `slideUp`)
* **show** *(boolean, number, string, object}* : define the default show behaviour (default: `slideDown`)
* **toggleMode** : *(string)* : tells how nodes are toggled (expanded/collapsed), may be any existing event (default: `dblclick`)

Methods
-------


Events
------

* **beforeSelect** : called before a node is selected/deselected. The event may be stopped by invoking `preventDefault()` on the event object. The callback also receive a second argument, an object containing the nodes being selected.
* **beforeToggle** : called before a node is toggled. The event may be stopped by invoking `preventDefault()` on the event object. The callback also receive a second argument, an object containing the nodes being toggled.
* **select** : called after the node was selected/deselected. The callback also receive a second argument, an object containing the nodes being toggled.
* **toggle** : called after the node was toggled. The callback also receive a second argument, an object containing the nodes being selected.
