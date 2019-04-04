module.exports = app => {
    const User = app.models.User;

    const save = async (req, res) => {
        const { email } = req.body;

        try {
            if (await User.findOne({ email })) {
              return res.status(400).json({ error: "User already exists" });
            }
        
            const user = await User.create(req.body);
        
            return res.json({ id: user._id, user: user.email, name: user.name });
          } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
          }
    }

    const get = async (req, res) => {
        try {
            const { id } = req.params;
    
            const user = await User.findById(id);
    
            return res.json({ id: user._id, user: user.email, name: user.name, createdAt: user.createdAt });
        } catch (err) {
            return res.status(400).json({ error: "Can't get user information" });
        }
    }

    return { save, get }
}