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
   
  }
  
  initAction() {
    let rules = {
      email: "required",
      name: "required",
      password: "required"
    };
  }
}