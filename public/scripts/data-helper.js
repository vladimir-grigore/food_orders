/**
 * This is pretending to get stuff from a database.
 */

module.exports = {
  getItemsForOrder(orderId){
    return Promise.resolve([{name: 'Spaghetti'}, {name: 'Donuts'}]);
  }
};
