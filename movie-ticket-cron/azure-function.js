const axios = require('axios');
const azureBlobStorage = require('@azure/storage-blob');

module.exports = async function (context, req) {
    let isMovieFound = false;
    try {
        if (!req.body || !req.body.movieUrl || !req.body.theaters || !req.body.storageFile) {
            throw new Error('Invlid input parameters');
        }
        const storageFile = req.body.storageFile;
        const fileContents = (await axios.get(storageFile)).data;
        if (fileContents == 'open') {
            throw new Error('Booking Completed');
        }
        context.log(req.body);
        const movieUrl = req.body.movieUrl;
        const theaters = req.body.theaters;
        context.log('Processing Movie URL');
        const bookmyshow = (await axios.get(movieUrl)).data;
        for (const theater of theaters) {
            if (bookmyshow.includes(theater)) {
                isMovieFound = true;
                const file = new azureBlobStorage.BlockBlobClient(storageFile);
                const available = 'open';
                await file.upload(available, available.length);
                break;
            }
        }
    } catch (err) {
        context.log(err);
    } finally {
        context.res = {
            status: isMovieFound ? 200 : 404,
            body: isMovieFound ? "true" : "false"
        };
    }
}