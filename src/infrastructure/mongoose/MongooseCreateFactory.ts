import mongoose from 'mongoose';

export class MongooseCreateFactory {
  static async create (uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to mongo', error);
      process.exit(1);
    }
  }
}
