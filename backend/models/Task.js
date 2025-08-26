import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    parentTask: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: null
    },
    path: {
      type: [Schema.Types.ObjectId],
      ref: 'Task',
      default: []
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'review', 'blocked', 'done'],
      default: 'todo',
      index: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      index: true
    },
    dueDate: {
      type: Date,
      index: true
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    order: {
      type: Number,
      default: 0
    },
    archived: {
      type: Boolean,
      default: false,
      index: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Update path based on parentTask
taskSchema.pre('save', async function (next) {
  if (this.isModified('parentTask') && this.parentTask) {
    const parent = await this.constructor.findById(this.parentTask).select('path').lean();
    this.path = parent ? [...parent.path, parent._id] : [];
  }
  next();
});

const Task = model('Task', taskSchema);
export default Task;
