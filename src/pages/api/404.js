const handler = async (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
};

export default handler;
