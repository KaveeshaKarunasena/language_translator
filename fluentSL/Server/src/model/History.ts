import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const History = new Schema(
  {
    user_id: {
      type: ObjectId,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const HistoryModel = mongoose.model('History', History);

export default HistoryModel;
