'use strict';
/**
 * model
 */

export default class extends think.model.mongo {
  init(...args) {
    super.init(...args);
    
    this.schema = {
      authorId: {
        type: 'string',
        required: true
      },
      title: {
        type: 'string',
        required: true
      },
      content: {
        type: 'string'
      },
      viewCount: {
        type: 'integer',
        default: () => {
          return 0;
        }
      },
      hide: {
        type: 'boolean',
        default: () => {
          return false;
        }
      },
      createdAt: {
        type: 'date',
        default: new Date(),
        readonly: true
      },
      updatedAt: {
        type: 'date',
        default: new Date()
      }
    };
    
    this.indexes = {
      createdAt: -1
    };
  }
}