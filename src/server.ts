import app from "./app";

// port from environment variables or default to 5000
const PORT = process.env.PORT || 6000;

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
