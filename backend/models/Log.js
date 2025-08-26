import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const logSchema = new Schema(
  {
    level: {
      type: String,
      enum: ['trace', 'debug', 'info', 'warn', 'error'],
      required: true,
      index: true
    },
    category: {
      type: String,
      enum: ['auth', 'system', 'application', 'security', 'audit'],
      default: 'application',
      index: true
    },
    event: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      default: null
    },
    resourceType: {
      type: String,
      trim: true,
      maxlength: 100
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      index: true
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    },
    meta: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// keep logs for 90 days
logSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

const Log = model('Log', logSchema);
export default Log;
