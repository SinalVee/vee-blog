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
  async addAction(){
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
  
  async viewAction() {
    let md = MarkdownIt();
    let Post = this.model('post');
    let User = this.model('user');
    
    let postId = this.param('id');
    
    await Post.updateViewCount(postId);
    let post = await Post.where({_id: postId}).find();
    let author = await User.where({_id: post.authorId}).find();
    
    post.author = author.name;
    post.content = md.render(post.content);
    post.time = moment(post.createdAt).calendar();
    
    this.assign({
      title: post.title,
      post
    });
    
    return this.display();
  }
  
  async editAction() {
    let Post = this.model('post');
    
    let postId = this.param('id');
    
    // if GET
    if (this.isGet()) {
      this.assign({
        title: 'Edit',
        editor: true
      });
      
      let post = await Post.where({_id: postId}).find();
      
      this.assign({
        post: post
      });
      
      return this.display();
    }
    
    // if POST
    let title = this.param('title');
    let content = this.param('content');
    
    await Post.where({_id: postId}).update({
      title,
      content
    });
    
    return this.redirect('/');
  }
  
  async hideAction() {
    let Post = this.model('post');
    let postId = this.param('id');
    
    await Post.where({_id: postId}).update({hide: true});
    
    return this.redirect('/');
  }
  
  async showAction() {
    let Post = this.model('post');
    let postId = this.param('id');
    
    await Post.where({_id: postId}).update({hide: false});
    
    return this.redirect('/');
  }
  
  async deleteAction() {
    let Post = this.model('post');
    let postId = this.param('id');
    
    await Post.where({_id: postId}).delete();
    
    return this.redirect('/');
  }
}