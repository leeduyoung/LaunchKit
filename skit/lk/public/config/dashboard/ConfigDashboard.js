/**
 * @license
 * Copyright 2016 Cluster Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Controller = skit.platform.Controller;
var navigation = skit.platform.navigation;

var LKAnalyticsAPIClient = library.api.LKAnalyticsAPIClient;
var Dashboard = library.controllers.Dashboard;
var introHtml = library.products.dashboardintro;


module.exports = Controller.create(Dashboard, {
  __preload__: function(done) {
    if (!this.product) {
      navigation.notFound();
      done();
      return;
    }

    LKAnalyticsAPIClient.apps(LKAnalyticsAPIClient.Products.CONFIG, {
      onSuccess: function(apps) {
        if (apps.length) {
          var url = '/config/dashboard/' + encodeURIComponent(apps[0]['bundleId']);
          navigation.navigate(url);
        }
      },
      onError: function(code, e) {
        throw new Error('Error: ' + JSON.stringify(e));
      },
      onComplete: done,
      context: this
    });
  },

  __title__: function() {
    return this.product.name;
  },

  __body__: function() {
    return introHtml({product: this.product});
  }
});
