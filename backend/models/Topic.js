const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let topicSchema = new Schema (
    {
        userID: {
            type: String,
            required: true
        },
        userInput: {
            type: String,
            required: true
        },
        // topicGroup: {
        //     type: String,
        //     required: true
        // },
        keywords: {
            type: String,
            required: true
        },
        // weight: {
        //     type: String,
        //     required: true
        // }
    },
    {
        timestamps: true
    }
)

const Topic = mongoose.model('Topic', topicSchema, 'Topic');

module.exports = Topic;