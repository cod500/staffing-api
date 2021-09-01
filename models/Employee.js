const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    scheduled: {
        type: Date
    },
    shift: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema)