import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  const { MONGO_URI } = process.env;
  return {
    uri: `${MONGO_URI}`,
  };
});
