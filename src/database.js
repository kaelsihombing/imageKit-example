const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/imageUpload',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)
    .then(() => {
        console.log('Database is Connected')
    }).catch((err) => {
        console.log(err);
        process.exit(1)
    })