'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
  init(...args) {
    super.init(...args);
    
    this.schema = {
      email: {
        type: 'string',
        required: 'true'
      },
      name: {
        type: 'string'
      },
      password: {
        type: 'string',
        required: true
      }
    };
    
    this.indexes = {
      email: {
        $unique: 1
      }
    };
  }
}