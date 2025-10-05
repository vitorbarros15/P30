import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/p30-nestjs',
  testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/p30-nestjs-test',
}));
