var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

require('mongoose-type-email');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    roleType: String,
    createdAt: { type: Date, default: Date.now },
    emailId: mongoose.SchemaTypes.Email,
    plan: String,
    classrooms: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classroom"
        },
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);