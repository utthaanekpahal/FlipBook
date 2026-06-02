import User from '../models/Signup.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
 //sign-------------------------------------------------------------------------------------------   
  try {
    const { username, password, confirmPassword } = req.body;

    // 1. Empty fields
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // 2. Gmail validation
    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(username)) {
      return res.status(400).json({
        message: "Only Gmail IDs allowed",
      });
    }

    // 3. Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Weak Password",
      });
    }

    // 4. Confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // 5. User exists
    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // 7. Save user
    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup Successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login---------------------------------------------------------------------------------

export const login = async (req, res) => {
  console.log("Login Hit");
   console.log(req.body);
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};