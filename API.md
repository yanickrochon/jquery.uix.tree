API
===


Optoins
-------

* **icons** *(object)* : define the node `expanded` (default: `ui-icon-triangle-1-se`) and `collapsed` (default: `ui-icon-triangle-1-e`) icons node handles
* **hide** *(boolean, number, string, object}* : define the default hide behaviour (default: `slideUp`)
* **show** *(boolean, number, string, object}* : define the default show behaviour (default: `slideDown`)
* **toggleMode** : *(string)* : tells how nodes are toggled (expanded/collapsed), may be any existing event (default: `dblclick`)
* **fullRowSelect** : *(boolean)* : if set to true, selection will highlight the entire row (default: `false`)
* **checkTree**: *(boolean)* : define if each tree item should have a check box to determine selection (default: `false`)

Methods
-------


Events
------

* **beforeNodeSelect** : called before a node is selected/deselected. The event may be stopped by invoking `preventDefault()` on the event object. The callback also receive a second argument, an object containing the nodes being selected.
* **beforeNodeToggle** : called before a node is toggled. The event may be stopped by invoking `preventDefault()` on the event object. The callback also receive a second argument, an object containing the nodes being toggled.
* **nodeSelect** : called after the node was selected/deselected. The callback also receive a second argument, an object containing the nodes being toggled.
* **nodeToggle** : called after the node was toggled. The callback also receive a second argument, an object containing the nodes being selected.
* **nodeActivate** : called when a node is being activated (receive focus)
* **nodeDeactivate** : called when a node is being deactivated (lose focus)
