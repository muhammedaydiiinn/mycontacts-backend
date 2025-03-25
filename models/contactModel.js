const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    // contact created by user
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Contact', contactSchema);