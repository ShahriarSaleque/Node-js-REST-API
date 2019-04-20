module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://akash1234:akash1234@ds251332.mlab.com:51332/akash',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}