import mongoose from 'mongoose';

class AppDataBase {
  async connect() {
    const mongoURI = process.env.MONGO_DB_URI;
    try {
      if (mongoURI === undefined) throw new Error('no connection string');
      await mongoose.connect(mongoURI);
      console.log('\x1b[32m%s\x1b[0m', '[mongoDB] connected to mongodb');

      mongoose.connection.on('error', (error: any) => {
        console.log('\x1b[31m%s\x1b[0m', '[mongoDB] disconnected');
        this.handleError(error);
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    console.error(error);
  }
}

export const appDataBase = new AppDataBase();
