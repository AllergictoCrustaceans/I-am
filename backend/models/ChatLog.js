const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let chatlogSchema = new Schema (
    {
        userID: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        botInput: {
            type: String,
            required: true
        },
        userInput : {
            type: String,
        },
        overallSentiment: {
            type: String,
            required: true
        },
        positive: {
            type: Number,
            required: true,
        },
        mixed: {
            type: Number,
            required: true
        },
        neutral: {
            type: Number,
            required: true
        },
        negative: {
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