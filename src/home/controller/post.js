'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    // if GET
    if (this.isGet()) {
      this.assign({
        title: 'Post',
        editor: true
      });
      
      return this.display();
    }
    
    // if POST
    let Post = this.model('post');
    
    let authorId = this.assign('user')._id;
    let title = this.param('title');
    let content = this.param('content');
    
    await Post.add({
      authorId,
      title,
      content
    });
    
    return this.redirect('/');
  }
}