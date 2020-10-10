var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Comment = require("./commentModel")

//Schema Setup
var AnnouncementSchema = new Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    resources: [{
        type: mongoose.Schema.Types.ObjectId
    }],
});

AnnouncementSchema.pre('remove', async function () {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    });
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);