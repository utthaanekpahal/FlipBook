import User from '../models/Signup.js'
import Agent from '../models/Agent.js'
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
   /*Agent----*/
     const agent = await Agent.findOne({
      email: username,
    });

    if (agent) {
      const isAgentMatch = await bcrypt.compare(
        password,
        agent.password
      );

      if (!isAgentMatch) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }
      agent.lastLogin = new Date();
      await agent.save();
       if (agent.status === "Deactivated") {
       return res.status(403).json({
       success: false,
       message: "Account is deactivated",
      });
}
      return res.status(200).json({
        success: true,
        role: "agent",
        message: "Agent Login Successful",
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
      role: "user",
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
/*agentlogin------------------------------------------------------------------*/
export const agentsignup = async (req, res) => {
  try {
    const {
      agentname,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !agentname ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const existingAgent =
      await Agent.findOne({ email });

    if (existingAgent) {
      return res.status(400).json({
        message: "Agent already exists",
      });
    }
    
    const hashedPassword =
      await bcrypt.hash(password, 10);

    await Agent.create({
      name: agentname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Agent Registered Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
/*get agent data----------------------*/
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();

    res.status(200).json({
      success: true,
      agents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/*agent update-------------------------------*/
export const agentupdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAgent = await Agent.findById(id);

    if (!existingAgent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // only update password + status
    const updateData = {};

    if (req.body.updateagentpass) {
      const hashedPassword = await bcrypt.hash(req.body.updateagentpass, 10);
      updateData.password = hashedPassword;
    }

    if (req.body.updatedstatus) {
      updateData.status = req.body.updatedstatus;
    }

    const updatedAgent = await Agent.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      data: updatedAgent,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};