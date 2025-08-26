import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    contactName: {
      type: String,
      trim: true
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true
    },
    contactPhone: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

clientSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Client = model('Client', clientSchema);
export default Client;
