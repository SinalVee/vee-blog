'use strict';

/**
 * session configs
 */
export default {
  name: 'vee-blog',
  type: 'db',
  secret: '@Z#H76XI',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.getPath('common', 'runtime') + '/session',
    }
  }
};