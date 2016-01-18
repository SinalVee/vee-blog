'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
   indexAction(){
    this.assign({
      title: 'Index'
    });
    return this.display();
  }
  
  async initAction() {
    let userModel = this.model('user');
    let userCount = await userModel.count();

    if (userCount === 0) {
      if (this.isGet()) {
        this.assign({
          title: 'Init'
        });
        
        return this.display();
      }
      
      let email = this.param('email');
      let name = this.param('name');
      let password = think.md5(this.param('name'));
      
      let userId = await userModel.add({
        email,
        name,
        password
      });
      let user = await userModel.where({
        _id: userId
      }).find();

      await this.session('user', user);
      
      return this.redirect('/');
    }
    
    return this.redirect('/');
  }
}