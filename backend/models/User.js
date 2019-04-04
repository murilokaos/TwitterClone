const bcrypt = require('bcryptjs')

module.exports = app => {
    const UserSchema = new app.mongoose.Schema({
        name: {
            type: String,
            require: true
          },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    UserSchema.pre("save", async function hashPassword(next) {
        if (!this.isModified("password")) next();
        
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    });
      
      UserSchema.methods = {
        compareHash(hash) {
          return bcrypt.compare(hash, this.password);
        },
      
        // generateToken() {
        //   return jwt.sign({ id: this.id }, app.env.authSecret, {
        //     expiresIn: 86400
        //   });
        // }
      };

    const User = app.mongoose.model("User", UserSchema);

    return User;
}