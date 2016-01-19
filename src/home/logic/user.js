'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
    if (this.isGet()) {
      
    } else {
      let rules = {
        email: 'requierd|email',
        password: 'requierd'
      };
    }
  }
}