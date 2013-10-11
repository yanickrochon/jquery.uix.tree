jQuery UIx Tree
==================

Introduction
------------

This is a fully integrated jQuery UI widget to display a tree structure. This is a work in progress
as there are still some [missing features](http://wiki.jqueryui.com/w/page/12138128/Tree)).


Features
--------

* Standardized API and events using the very good jQuery UI Widget factory
* 100% themable through [Theme Roller](http://jqueryui.com/themeroller/)
* HTML5 ready (ARIA attributes, etc.)
* Full keyboard navigation
* Checkbox tree optional


TODO
----

* Add tests and validations
* Drag and drop support

Usage
-----

    <ul id="tree">
      <li><a href="#">Root node</a>
        <ul>
          <li><a href="#">Node 1 (no leaf)</a>
            <ul></ul>
          </li>
          <li><a href="#">Node 2</a>
            <ul>
              <li><a href="#">Leaf 1</a></li>
              <li><a href="#">Leaf 2</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

And simply invoke using

    $("#tree").tree();

License
-------

The widget is released under the MIT license. You can get a copy of this license in [MIT-LICENSE.txt](MIT-LICENSE.txt).
