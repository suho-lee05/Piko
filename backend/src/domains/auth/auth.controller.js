const jwt = require('jsonwebtoken');
const authService = require('./auth.service');

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeMember(member) {
  return {
    useruuid: member.useruuid,
    email: member.email,
    username: member.username,
    phonenumber: member.phonenumber,
    roadaddress: member.roadaddress,
    createdat: member.createdat,
  };
}

async function register(req, res) {
  const { email, userName, password, phoneNumber, roadAddress } = req.body || {};

  if (!email || !userName || !password) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'email, userName, password are required',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Invalid email format',
    });
  }

  const { data: existing, error: findError } = await authService.findMemberByEmail(
    email
  );
  if (findError) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to check existing member',
      details: findError.message,
    });
  }
  if (existing) {
    return res.status(409).json({
      status: 'ERROR',
      message: 'Email already exists',
    });
  }

  const { data, error } = await authService.createMember({
    email,
    userName,
    password,
    phoneNumber,
    roadAddress,
  });

  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create member',
      details: error.message,
    });
  }

  return res.status(201).json({
    status: 'OK',
    member: sanitizeMember(data),
  });
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'email and password are required',
    });
  }

  const { data, error } = await authService.authenticateMember(email, password);
  if (error && error.code === 'INVALID_CREDENTIALS') {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Invalid email or password',
    });
  }
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Login failed',
      details: error.message,
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'JWT_SECRET is missing in environment',
    });
  }

  const token = jwt.sign(
    { useruuid: data.useruuid, email: data.email },
    jwtSecret,
    { expiresIn: '7d' }
  );

  return res.status(200).json({
    status: 'OK',
    token,
    member: sanitizeMember(data),
  });
}

module.exports = {
  register,
  login,
};
