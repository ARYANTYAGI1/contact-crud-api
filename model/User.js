const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  this.email = this.email ? this.email.toLowerCase().trim() : this.email;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
