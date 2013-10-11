/*
 * jQuery UIx Tree
 *
 * Authors:
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 *
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://mind2soft.com/labs/jquery/tabs/
 *
 *
 * Depends:
 * jQuery UI 1.9+
 *
 */

(function( $, undefined ) {


$.widget("uix.tree", {
    version: "0.1",
    options: {
        icons: {                          // object                  define the node icons
            expanded: "ui-icon-triangle-1-se",    //                 when the node is expanded (default: "ui-icon-triangle-1-se")
            collapsed: "ui-icon-triangle-1-e"     //                 when the node is collapsed (default: "ui-icon-triangle-1-e")
        },
        hide: "slideUp",                  // boolean, number         string or object : define the default hide and show behaviour (default "slideUp")
        show: "slideDown",                //                         see : http://api.jqueryui.com/jQuery.widget/#option-hide (default "slideDown")
        toggleMode: "dblclick",           // "click" | "dblclick"    set the node toggle mode (default: "dblclick")
        fullRowSelect: false,             // boolean                 if set to true, selection will highlight the entire row (default false)
        checkTree: false,                 // boolean                 define if each tree item should have a check box to determine selection (default false)
        beforeNodeSelect: null,           // function                the event triggered before a node is selected (cancellable)
        nodeSelect: null,                 // function                the event triggered when a node is selected
        beforeNodeToggle: null,           // function                the event triggered before a node is toggled (cancellable)
        nodeToggle: null,                 // function                the event triggered when a node is toggled
        nodeActivate: null,               // function                the event triggered when a node is activated
        nodeDeactivate: null              // funciton                the event triggered when a node is deactivated
    },

    _create: function() {
        this._bindNavigation();
        this._buildTree();
    },

    _createUI: function(nodes) {
        return {
            nodes: nodes
        };
    },

    _bindNavigation: function() {
        this._on( this.element, {
            'keydown a:focus': function (evt) {
                var _dir;
                switch (evt.which) {
                    case 37: _dir = "Left"; break;
                    case 38: _dir = "Up"; break;
                    case 39: _dir = "Right"; break;
                    case 40: _dir = "Down"; break;
                }
                if (_dir) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    this["_move" + _dir]($(evt.target));
                }
            }
        });
    },

    _buildTree: function() {
        this._createNodesRecursive( this.element.attr("role", "tree").addClass("uix-tree ui-widget ui-widget-content ui-corner-all").children("li"), 1 );

        var anchors = this.element.find("li > a:only-child")
            .parent().addClass("uix-tree-leaf").end()
            .attr("role", "treeitem").addClass("ui-corner-all").uniqueId()
            .children("span.ui-icon").parent().css('padding-left', "18px").end().end()
        var anchorEvents = {
            "mousedown": function (evt) { this._selectNode($(evt.currentTarget)); return false; },
            'click': function (evt) { evt.stopPropagation(); evt.preventDefault(); } // leaf
        };

        if (this.options.checkTree) {
            anchors.addClass("uix-checked").before( $("<input type=\"checkbox\" />").addClass("uix-tree-node-checkbox") );
            anchorEvents['keypress'] = function (evt) { if (evt.keyCode === 32) this._activateNode($(evt.currentTarget), !$(evt.currentTarget).prev().prop("checked")); };
        }
        if (this.options.fullRowSelect) {
            anchors.addClass("uix-anchor-block");
        }

        this._focusable( anchors );
        this._hoverable( anchors );
        this._on( anchors, anchorEvents );
        this._on( this.element.find("span.uix-tree-node-handle"), {
            "mousedown": function(evt) { evt.preventDefault(); },   // prevent handles from stealing the focus
            "click": function(evt) { this._toggleNode( $(evt.currentTarget).siblings("a:first") ); }
        } );

        this._on(this.element.find(":input[type='checkbox']"), {
            "click": function (evt) { this._activateNode($(evt.currentTarget).next(), $(evt.currentTarget).is(":checked")); }
        });
    },

    _createNodesRecursive: function( base, level ) {
        var handle = $("<span></span>").addClass("uix-tree-node-handle ui-icon " + this.options.icons.collapsed);

        var nodes = base.attr("aria-level", level).children("ul").hide().attr("role", "group")
            .parent().attr("aria-expanded", false).append( handle ).end().children("li");

        if (nodes.length) {
            var anchors = base.addClass("uix-tree-node")
                .children("a:not(:only-child)").attr("role", "treeitem").addClass("ui-corner-all").uniqueId()
                .children("span.ui-icon").parent().css('padding-left', "18px").end().end();
            var anchorEvents = {
                'mousedown': function (evt) { this._selectNode($(evt.currentTarget)); return false; },
                'click': function (evt) { evt.stopPropagation(); evt.preventDefault(); }, // node
            };

            if (this.options.checkTree) {
                anchors.addClass("uix-checked").before( $("<input type=\"checkbox\" />").addClass("uix-tree-node-checkbox") );
                anchorEvents['keypress'] = function (evt) { if (evt.keyCode === 32) this._activateNode($(evt.currentTarget), !$(evt.currentTarget).prev().prop("checked")); };
            }
            if (this.options.fullRowSelect) {
                anchors.addClass("uix-anchor-block");
            }

            anchorEvents[this.options.toggleMode] = function(evt) { this._toggleNode( $(evt.currentTarget) ); };

            this._focusable( anchors );
            this._hoverable( anchors );
            this._on( anchors, anchorEvents );

            this._createNodesRecursive( nodes, level + 1 );
        }
    },

    _selectNode: function(node) {
        var ui = this._createUI(node);
        var evt = $.Event("select");

        this._trigger("beforeNodeSelect", evt, ui);

        if (!evt.isDefaultPrevented()) {
            return node.focus(), this._trigger("nodeSelect", evt, ui), true;
        }

        return false;
    },

    _toggleNode: function (node, state) {
        var ui = this._createUI(node);
        var evt = $.Event("toggle");

        var container = node.closest("li");
        var groupContainer = container.children("ul");
        var expanded = groupContainer.is(":visible");

        //if (!groupContainer.children("li").length) return state === expanded;
        if (state !== undefined && state === expanded) return true;
        state = !expanded;

        this._trigger("beforeNodeToggle", evt, ui);

        if (!evt.isDefaultPrevented()) {
            container.children("span.uix-tree-node-handle").toggleClass(this.options.icons.collapsed + " " + this.options.icons.expanded);
            
            if (groupContainer.find(".ui-state-focus").length) {
                this._delay(function() { this._selectNode(node); });  // if some children have focus, just grab it!
            }

            /*if (groupContainer.children("li").length)*/ this[expanded ? "_hide" : "_show"]( groupContainer, this.options[expanded ? "hide" : "show"] );

            container.attr("aria-expanded", !expanded);

            this._trigger("nodeToggle", evt, ui);

            return groupContainer.is(":visible") == state;
        }

        return false;
    },

    _activateNode: function (node, state/*, direction */) {
        state = !!state;  // to bool
        if (!(node.hasClass(".ui-state-disabled") && node.prev().prop("disabled"))) {
            node[(state ? "add" : "remove") + "Class"]("ui-state-active")
                .prev().prop("checked", state);

            this._trigger("node" + (state ? "A" : "Dea") + "ctivate", null, this._createUI(node));
        }

        if (arguments[2] !== "up") {
            var children = node.closest("li").children("ul").children("li").children("a");
            if (children.length)
                this._activateNode(children, state, "down");
        }
        if (arguments[2] !== "down") {
            var parent = node.closest("li").closest("ul").closest("li").children("a");
            if (parent.length) {
                // test if all node's siblings are also in the same state
                var siblings = node.closest("li").siblings("li").children("a:first").add(node);
                var allSelected = siblings.length === siblings.filter(".ui-state-active").length;

                this._activateNode(parent, allSelected, "up");
            }
        }
    },

    _moveLeft: function(node, ignoreToggle) {
        if ( !ignoreToggle && !this._toggleNode( node, false ) ) return;
        var nextNode = node.closest("li").closest("ul").closest("li").children("a:first");
        if (nextNode.length) this._selectNode( nextNode );
    },

    _moveUp: function(node) {
        var nextNode = node.closest("li").prev("li");
        if (!nextNode.length) {
            this._moveLeft( node, true );
        } else { 
            if ( nextNode.find("a:visible:last").length )
                this._selectNode( nextNode.find("a:visible:last") );
            else
                this._selectNode( nextNode.children("a:first") );
        }
    },

    _moveRight: function(node) {
        if (this._toggleNode(node, true)) {
            this._selectNode( node.closest("li").children("ul").children("li").children("a:first") );
        } else {
            this._moveDown( node );
        }
    },

    _moveDown: function(node) {
        if (node.closest("lI").children("ul:first").find("li").is(":visible")) {
            this._selectNode( node.closest("li").children("ul:first").children("li:first").children("a:first") );
        } else {
            var nextNode = node.closest("li").next("li").children("a");
            if (!nextNode.length) {
                var parent = node;

                while (!nextNode.length && parent.length && $.contains(this.element[0], parent[0])) {
                    parent = parent.closest("li").closest("ul").closest("li");
                    nextNode = parent.next("li").children("a:first");
                }
            }
            if (nextNode.length) this._selectNode( nextNode );
        }
    },

    //_setOption: function( key, value ) {
        // TODO : implement this
    //},

    //_refresh: function() {
        // TODO : destroy and rebuild the whole tree ???
    //},

    _destroy: function() {
        this.element
            // cleanup element
            .removeClass("uix-tree ui-widget ui-widget-content ui-corner-all").removeAttr("role")
            // deactivate any active nodes...
            .find(".ui-state-active").removeClass(".ui-state-active").end()
            // find all toggle icons and checkboxes and remvoe them
            .find("span.uix-tree-node-handle, input.uix-tree-node-checkbox").remove().end()
            // "expand" all sub trees and remove their attribute
            .find("ul").removeAttr("role").show().end()
            // find all nodes and clean them
            .find(".uix-tree-leaf, .uix-tree-node").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-level").removeClass("uix-tree-leaf uix-tree-node").end()
            // clean all node anchors
            .find("li a:first-child").removeAttr("role").removeClass("ui-corner-all uix-checked ui-state-active").end()
        ;
    }

});

})(jQuery);
