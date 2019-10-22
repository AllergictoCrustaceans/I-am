const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let topicSchema = new Schema (
    {
        userInput: {
            type: String,
            required: true
        },
        topicGroup: {
            type: String,
            required: true
        },
        keywords: {
            type: String,
            required: true
        },
        Weight: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Topic = mongoose('Topic', topicSchema, 'Topic');

module.exports = Topic;