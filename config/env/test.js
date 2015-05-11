
/**
 * Expose
 */

module.exports = {
  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017'
};
