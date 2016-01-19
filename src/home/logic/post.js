'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  async __before() {
    let user = await this.session('user');
    
    if (user) {
      this.assign('user', user);
    } else {
      return this.redirect('/');
    }
  }
    
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
    
  }
}