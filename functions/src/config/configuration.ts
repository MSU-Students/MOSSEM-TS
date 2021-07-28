export default () => ({
    version: process.env.VERSION || '0.0.1',
    jwt: {
        secret: process.env.JWT_SECRET || 'mamis',
        expiresIn: process.env.JWT_EXPIRY || '600000s' //15 mins
    },
    refresh: {
        secret: process.env.REFRESH_TOKEN_SECRET || 'mamis',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '600000s' //almost 1 week
    }
  });
  