process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const axios = require('axios');
const https = require('https');
const express = require('express');
const app = express();
const port = 3000;

const WINDOW_SIZE = 10;
let windowState = [];

// HTTPS agent to ignore self-signed certificate
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

app.get('/average', async (req, res) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQwNDg2LCJpYXQiOjE3MjQ3NDAxODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjEwNzVlNWVlLTE2NmItNGMzOS1iMGM0LTY3MjQzMjEzNDQyOCIsInN1YiI6Im11c2thcm1vbmlzaEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJtTWFydCIsImNsaWVudElEIjoiMTA3NWU1ZWUtMTY2Yi00YzM5LWIwYzQtNjcyNDMyMTM0NDI4IiwiY2xpZW50U2VjcmV0IjoiQnJCbmJmTlhhSGZDaGFIeCIsIm93bmVyTmFtZSI6Ik11c2thciBNb25pc2giLCJvd25lckVtYWlsIjoibXVza2FybW9uaXNoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxRUcxMDdCMjIifQ.qtLtc-XLv0EMnpaL4bNxnthJDAyyGnzx4K5JsbuyKnI";

        const response = await axios.get('https://20.244.56.144/test/rand', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            httpsAgent // Use the custom HTTPS agent
        });

        const numbers = response.data.numbers;
        let windowPrevState = [...windowState];
        windowState = [...windowState, ...numbers].slice(-WINDOW_SIZE);

        const sum = windowState.reduce((acc, num) => acc + num, 0);
        const avg = (sum / windowState.length).toFixed(2);

        res.json({
            numbers,
            windowPrevState,
            windowCurrState: windowState,
            avg: parseFloat(avg)
        });

    } catch (error) {
        console.error('Error fetching random numbers:', error.message);
        res.status(500).json({ error: 'Failed to retrieve numbers' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
