const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const chatlogSchema = new Schema (
    {
        botInput: {
            type: String,
        },
        userInput : {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const ChatLog = mongoose.model('Chat Log', chatlogSchema, 'Chat Log');

module.exports = ChatLog;