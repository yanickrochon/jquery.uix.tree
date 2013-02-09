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
    options: {
        icons: {                          // object : define the node icons
            expanded: "ui-icon-triangle-1-se",    // when the node is expanded (default: "ui-icon-triangle-1-se")
            collapsed: "ui-icon-triangle-1-e"     // when the node is collapsed (default: "ui-icon-triangle-1-e")
        },
        hide: "slideUp",                  // boolean, number, string or object : define the default hide and show behaviour
        show: "slideDown",                //    see : http://api.jqueryui.com/jQuery.widget/#option-hide
        toggleMode: "dblclick"            // "click", "dblclick", etc. : set the node toggle mode (default: "click")
    },

    _create: function() {
        this._buildTree();
    },

    _createUI: function(nodes) {
        return {
            nodes: nodes
        };
    },

    _createGlobalEventCallback: function(eventName) {
        if (typeof this.options[eventName] === "function") {
            return $.proxy(function(evt, ui) {
                evt.stopPropagation();
                return this.options[eventName].call(this, evt, ui);
            }, this);
        } else {
            return $.noop;
        }
    },

    _buildTree: function() {
        this._createNodesRecursive( this.element.attr("role", "tree").addClass("uix-tree ui-widget ui-widget-content ui-corner-all").children("li"), 1 );

        var anchors = this.element.find("li > a:only-child")
            .parent().addClass("uix-tree-leaf").end()
            .attr("role", "presentation").addClass("ui-corner-all").uniqueId()
            .children("span.ui-icon").parent().css('padding-left', "18px").end().end();

        this._hoverable( anchors );
        this._on( anchors, {
            'click': function(evt) { this._selectNode( $(evt.currentTarget).closest("li") ); return false; }
        } );
        this._on( this.element.find("span.uix-tree-node-handle"), {
            'click': function(evt) { this._toggleNode( $(evt.currentTarget).closest("li") ); }
        } );

        this._on( this.element.find("li"), {
            beforeSelect: this._createGlobalEventCallback("beforeSelect"),
            select: this._createGlobalEventCallback("select")
        } );

        this._on( this.element.find("li.uix-tree-node"), {
            beforeToggle: this._createGlobalEventCallback("beforeToggle"),
            toggle: this._createGlobalEventCallback("toggle")
        } );

    },

    _createNodesRecursive: function( base, level ) {
        var handle = $("<span></span>").addClass("uix-tree-node-handle ui-icon " + this.options.icons.collapsed);

        var nodes = base.attr("aria-level", level).children("ul").hide().attr("role", "group")
            .parent().attr("aria-expanded", false).append( handle ).end().children("li");

        if (nodes.length) {

            var anchors = base.attr("role", "treeitem").addClass("uix-tree-node")
                .children("a").attr("role", "presentation").addClass("ui-corner-all").uniqueId()
                .children("span.ui-icon").parent().css('padding-left', "18px").end().end();

            this._hoverable( anchors );

            var events = { 'click': function(evt) { this._selectNode( $(evt.currentTarget).closest("li") ); return false; } };
            events[this.options.toggleMode] = function(evt) { this._toggleNode( $(evt.currentTarget).closest("li") ); };

            this._on( anchors, events );

            this._createNodesRecursive( nodes, level + 1 );
        }
    },

    _selectNode: function(node) {
        var ui = this._createUI(node);
        var evt = $.Event("beforeSelect");

        node.trigger(evt, ui);

        if (!evt.isDefaultPrevented()) {
            this.element.find(".ui-state-active").removeClass("ui-state-active");
            node.children("a").addClass("ui-state-active");

            node.trigger("select", ui);
        }
    },

    _toggleNode: function(node) {
        var ui = this._createUI(node);
        var evt = $.Event("beforeToggle");

        node.trigger(evt, ui);

        if (!evt.isDefaultPrevented()) {

            var expanded = !node.children("span.uix-tree-node-handle." + this.options.icons.expanded).length;

            var groupContainer = node
                .children("span.uix-tree-node-handle").toggleClass(this.options.icons.collapsed + " " + this.options.icons.expanded).end()
                .children("ul");
            var nodeSelected = groupContainer
                    .find(".ui-state-active")
                    .removeClass("ui-state-active").length > 0;

            node.attr("aria-expanded", expanded);

            if (groupContainer.children("li").length) this[expanded ? "_show" : "_hide"]( groupContainer, this.options[expanded ? "show" : "hide"] );

            node.trigger("toggle", ui);

            if (nodeSelected) this._selectNode(node);
        }
    },

    _setOption: function( key, value ) {
        // TODO : implement this
    },

    _refresh: function() {
        // TODO : destroy and rebuild the whole tree ???
    },

    _destroy: function() {
        // TODO : remove ARIA, remove classes, remove all added nodes
    }

});


})(jQuery);
