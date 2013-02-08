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
    },

    _create: function() {
        this._buildTree();
    },

    _buildTree: function() {
        this._createNodesRecursive( this.element.addClass("uix-tree ui-widget ui-widget-content ui-corner-all").children("li") );

        var anchors = this.element.find("li > a:only-child").parent().addClass("uix-tree-leaf").end().addClass("ui-corner-all").uniqueId();

        this._hoverable( anchors );
        this._on( anchors, {
            'click': function(evt) { $(evt.currentTarget).closest("li").trigger("selecttreenode"); },
            'selecttreenode': function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                this._selectNode( $(evt.target) );
            },
        } );
        this._on( this.element.find("span.uix-tree-node-handle"), {
            'click': function(evt) { $(evt.currentTarget).closest("li").trigger("toggletreenode"); }
        } );
    },

    _createNodesRecursive: function( base ) {
        var nodes = base.children("ul").children("li");

        if (nodes.length) {

            var handle = $("<span></span>").addClass("uix-tree-node-handle ui-icon ui-icon-circlesmall-plus");

            var anchors = base.addClass("uix-tree-node").append( handle ).children("a").addClass("ui-corner-all").uniqueId();

            this._hoverable( anchors );
            this._on( anchors, {
                'click': function(evt) { $(evt.currentTarget).closest("li").trigger("selecttreenode"); },
                'dblclick': function(evt) { $(evt.currentTarget).closest("li").trigger("toggletreenode"); }
            } );
            this._on( base, {
                'selecttreenode': function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    this._selectNode( $(evt.target) );
                },
                'toggletreenode': function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    this._toggleNode( $(evt.target) );
                }
            } );

            this._createNodesRecursive( nodes );
        }
    },

    _selectNode: function(node) {
        this.element.find(".ui-state-active").removeClass("ui-state-active");
        node.children("a").addClass("ui-state-active");
    },

    _toggleNode: function(node) {
        var nodeSelected = node
            .children("span.uix-tree-node-handle").toggleClass("ui-icon-circlesmall-plus ui-icon-circlesmall-minus").end()
            .children("ul")
                .slideToggle()
                .find(".ui-state-active")
                .removeClass("ui-state-active").length > 0
        ;

        if (nodeSelected) this._selectNode(node);
    },

    _destroy: function() {

    }

});


})(jQuery);
