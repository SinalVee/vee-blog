'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let user = await this.session('user');
    
    this.assign({
      title: 'Index',
      user
    });
    
    return this.display();
  }
  
  async initAction() {
    let User = this.model('user');
    let userCount = await User.count();

    if (userCount === 0) {
      if (this.isGet()) {
        this.assign({
          title: 'Init'
        });
        
        return this.display();
      }
      
      let email = this.param('email');
      let name = this.param('name');
      let password = think.md5(this.param('password'));
      
      let userId = await User.add({
        email,
        name,
        password
      });
     
      let user = await User.where({
        _id: userId.toString()
      }).find();
      
      await this.session('user', user);
      
      return this.redirect('/');
    }
    
    return this.redirect('/');
  }
}