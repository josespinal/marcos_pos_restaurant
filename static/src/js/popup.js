odoo.define("marcos_pos_restaurant.popups", function(require) {
  "use strict";

  var PopupWidget = require("point_of_sale.popups");
  var gui = require("point_of_sale.gui");

  var barcode_cashier_action = function(code) {
      var self = this,
          users = this.pos.users,
          options = self.options;

      for (var i = 0, len = users.length; i < len; i++) {
          if (users[i].barcode === code.code) {
              this.pos.set_cashier(users[i]);
              this.chrome.widget.username.renderElement();
              options.floorplan.pos.set_table(options.table);

              console.info('Changed cashier and opened table');

              this.gui.close_popup();
              return true;
          }
      }
      // Is taken from the this.gui.current_screen.barcode_error_action
      var show_code = "";
      if (code.code.length > 32) {
          show_code = code.code.substring(0, 29) + "...";
      } else {
          show_code = code.code;
      }

      this.gui.show_popup("custom-error-barcode", {
          barcode: show_code,
          confirm: _.bind(self.gui.show_popup, self.gui, "block", { table: options.table, floorplan: options.floorplan }),
          cancel: _.bind(self.gui.show_popup, self.gui, "block", { table: options.table, floorplan: options.floorplan }),
      });
      return false;
  };

  var CustomErrorBarcodePopupWidget = PopupWidget.extend({
      template: "ErrorBarcodePopupWidget",
      show: function(options) {
          this._super(options || {});
          this.gui.play_sound("error");
      },
  });
  gui.define_popup({
      name: "custom-error-barcode",
      widget: CustomErrorBarcodePopupWidget,
  });

  var BlockPopupWidget = PopupWidget.extend({
      template: "BlockPopupWidget",
      show: function(options) {
          var self = this;
          this._super(options);
          this.renderElement();
          $(".modal-dialog.block").click(function() {
              self.click_unlock();
          });

          this.pos.barcode_reader.set_action_callback({
              cashier: _.bind(self.barcode_cashier_action, self),
          });
      },

      click_unlock: function() {
          var self = this;
          this.gui.close_popup();
      },

      click_confirm: function () {
        console.log('Confirm function');
      },
  });
  BlockPopupWidget.prototype.barcode_cashier_action = barcode_cashier_action;
  gui.define_popup({name: "block", widget: BlockPopupWidget});

  return BlockPopupWidget;
});
