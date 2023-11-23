odoo.define("marcos_pos_restaurant.floor", function (require) {
  "use strict";

  var floors = require('pos_restaurant.floors');

  floors.TableWidget.include({
    init: function (parent, options) {
      var self = this;
      options = options;

      this._super(parent, options);
    },
    click_handler: function () {
      var self = this;
      var floorplan = this.getParent();

      if (floorplan.editing) {
        setTimeout(function () {  // in a setTimeout to debounce with drag&drop start
          if (!self.dragging) {
            if (self.moved) {
              self.moved = false;
            } else if (!self.selected) {
              self.getParent().select_table(self);
            } else {
              self.getParent().deselect_tables();
            }
          }
        }, 50);
      } else {
          this.gui.show_popup("block", { table: self.table, floorplan: floorplan });
      }
    },
  });

  return floors;
});
