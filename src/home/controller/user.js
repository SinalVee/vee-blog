'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  
  async loginAction() {
    // if it's GET method
    if (this.isGet()) {
      let user = await this.session('user');
      if (user) {
        return this.redirect('/');
      } else {
        this.assign({
          title: 'Login'
        });
        
        return this.display();
      }
    }
    
    // else, if it's POST method
    let email = this.param('email');
    let password = this.param('password');
    let md5Pass = think.md5(password);
    console.log(md5Pass);
    
    let userMedel = this.model('user');
    
    let user = await userMedel.where({
      email
    }).find();
    console.log(user);
    
    if (think.isEmpty(user)) {
      this.assign({
        title: 'Login',
        error: 'No email found!'
      });
      
      return this.display();
    }
    
    if (user.password !== md5Pass) {
      this.assign({
        title: 'Login',
        error: 'Incorrect password!'
      });
      
      return this.display();
    }
    
    await this.session('user', user);
    
    return this.redirect('/');
  }
  
  async logoutAction() {
    await this.session();
    
    return this.redirect('/');
  }
}