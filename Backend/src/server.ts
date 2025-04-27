import app from './app';
import connectDatabase from './configs/database';

const PORT: number | string = process.env.PORT! || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDatabase();
});