
/**
 * Expose
 */

module.exports = {
  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017'
};

// 'ec2-52-64-102-96.ap-southeast-2.compute.amazonaws.com:27017'