/**
 * Created by Robert Alexander on 16/10/2017.
 */
const mongoose = require('mongoose');

const hootSchema = mongoose.Schema({
  hashtag: String,
  hootmain: String,
  hooter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Hoot = mongoose.model('Hoot', hootSchema);
module.exports = Hoot;
