const bcrypt = require('bcryptjs');
const supabase = require('../../config/supabase');

const MEMBER_SELECT_FIELDS =
  'email, username, password, phonenumber, roadaddress, createdat, useruuid';

async function findMemberByEmail(email) {
  const { data, error } = await supabase
    .from('members')
    .select(MEMBER_SELECT_FIELDS)
    .eq('email', email)
    .maybeSingle();

  return { data, error };
}

async function createMember({ email, userName, password, phoneNumber, roadAddress }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const payload = {
    email,
    username: userName,
    password: passwordHash,
    phonenumber: phoneNumber || null,
    roadaddress: roadAddress || null,
    createdat: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('members')
    .insert([payload])
    .select(MEMBER_SELECT_FIELDS)
    .single();

  return { data, error };
}

async function authenticateMember(email, password) {
  const { data, error } = await findMemberByEmail(email);
  if (error) return { error };
  if (!data) return { error: { code: 'INVALID_CREDENTIALS' } };

  const isMatch = await bcrypt.compare(password, data.Password);
  if (!isMatch) return { error: { code: 'INVALID_CREDENTIALS' } };

  return { data };
}

module.exports = {
  findMemberByEmail,
  createMember,
  authenticateMember,
};
