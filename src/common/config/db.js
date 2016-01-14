'use strict';
/**
 * db config
 * @type {Object}
 * 
 * prefix set in mongo does't success, so set in root, waiting fix
 * 
 */
export default {
  type: 'mongo',
  log_sql: true,
  log_connect: true,
  prefix: '',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: '',
      user: '',
      password: '',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {
      host: '127.0.0.1',
      port: '',
      database: 'vee_blog',
      prefix: ''
    }
  }
};