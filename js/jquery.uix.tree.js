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

        var anchors = this.element.find("li > a:only-child").parent().addClass("uix-tree-leaf").end().addClass("ui-corner-all");
        var events = {
            'click': $.proxy(this._selectNode, this)
        };

        this._hoverable( anchors );
        this._on( anchors, events );
    },

    _createNodesRecursive: function( base ) {
        var nodes = base.children("ul").children("li");

        if (nodes.length) {
            var anchors = base.addClass("uix-tree-node").children("a").addClass("ui-corner-all");
            var events = {
                'dblclick': $.proxy(this._toggleNode, this)
            };

            this._hoverable( anchors );
            this._on( anchors, events );

            this._createNodesRecursive( nodes );
        }
    },

    _selectNode: function(evt) {
        //console.log("select");
        //console.log(evt);
        this.element.find(".ui-state-active").removeClass("ui-state-active");
        $(evt.target).addClass("ui-state-active");
    },

    _toggleNode: function(evt) {
        //console.log("toggle");
        //console.log(evt);
        $(evt.target).children("ul").slideToggle();
    },

    _destroy: function() {

    }

});


})(jQuery);
