const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connection Successful');
    } catch (err) {
        console.error('DB Connection Error:', err);
    }
};

module.exports = dbConnection;
