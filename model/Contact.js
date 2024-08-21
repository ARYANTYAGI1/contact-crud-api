const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    mobileNumber: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  {
    timestamps: true
  }
);

contactSchema.pre('save',function(next){
    this.updated_at = Date.now()
    this.email = this.email ? this.email.toLowerCase().trim() : this.email;
    next();
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;