
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  level: { type: String, required: true },
  message: { type: String, required: true },
  service: { type: String, required: true },
  function: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Log = model('Log', logSchema);
