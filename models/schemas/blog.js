const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogSchema = new Schema({
  title: String,
  article: String,
  intro: String,
  img: {
    type: String,
    default: '/images/b2.jpg'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  pv: {
    type: Number,
    default: 0
  },
  meta: {
    creatAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

BlogSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.creatAt':-1})         // _id 中包含了事件的算法
      .exec(cb)
  }
};

module.exports = BlogSchema;
