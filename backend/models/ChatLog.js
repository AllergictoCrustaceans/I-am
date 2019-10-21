const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const chatlogSchema = new Schema (
    {
        name: {
            type:String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        botInput: {
            type: String,
        },
        userInput : {
            type: String,
        },
        Positive: {
            type: Number,
            required: true,
        },
        Mixed: {
            type: Number,
            required: true
        },
        Neutral: {
            type: Number,
            required: true
        },
        Negative: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ChatLog = mongoose.model('Chat Log', chatlogSchema, 'Chat Log');

module.exports = ChatLog;