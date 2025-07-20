import app from './app.js';

const PORT = process.env.PORT || 8000;



app.use((err, req, res, next) => {
  if (err) return res.status(500).json({ message: "Something went wrong" });
  return next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
