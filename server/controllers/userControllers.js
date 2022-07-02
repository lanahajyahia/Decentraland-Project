const registerUser = async (req, res) => {
  const { username, password, type, budget, assets } = req.body;

  res.json({
    username,
    type,
    budget,
    assets,
  });
};

module.exports = { registerUser };
