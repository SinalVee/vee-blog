'use strict';

import MarkdownIt from 'markdown-it';
import moment from 'moment';
moment.locale('zh-cn');

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let md = MarkdownIt();
    
    let user = await this.session('user');
    
    let Post = this.model('post');
    let User = this.model('user');
    let posts = await Post.order('createdAt DESC').select()
    
    for (let post of posts) {
      post.content = md.render(post.content);
      post.time = moment(post.createdAt).calendar();
      let author = await User.where({_id: post.authorId}).find();
      post.author = author.name;
    }

    this.assign({
      title: 'Index',
      user,
      posts
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