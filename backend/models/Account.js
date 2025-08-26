import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 254
    },
    passwordHash: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    roles: {
      type: [String],
      enum: [
        'project_manager',
        'team_lead',
        'contributor',
        'client_contact',
        'admin'
      ],
      default: ['contributor'],
      index: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      index: true
    },
    verificationToken: {
      type: String,
      select: false
    },
    refreshTokens: [
      {
        token: { type: String, required: true, select: false },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true }
      }
    ],
    lastLoginAt: {
      type: Date,
      index: true
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'locked', 'disabled'],
      default: 'pending',
      index: true
    }
  },
  {
    timestamps: true
  }
);

// refresh updatedAt
accountSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// lock account if too many attempts
accountSchema.methods.incLoginAttempts = function () {
  const LOCK_TIME = 2 * 60 * 60 * 1000; // 2h
  if (this.lockUntil && this.lockUntil > Date.now()) {
    // still locked
    return this.updateOne({ $inc: { loginAttempts: 1 } }).exec();
  }
  // reset attempts & set lock
  return this.updateOne({
    loginAttempts: 1,
    lockUntil: Date.now() + LOCK_TIME
  }).exec();
};

const Account = model('Account', accountSchema);
export default Account;
