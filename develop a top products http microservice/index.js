process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const axios = require('axios');
const https = require('https');

const app = express();
const port = 3000;

const url = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQyMzc2LCJpYXQiOjE3MjQ3NDIwNzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjEwNzVlNWVlLTE2NmItNGMzOS1iMGM0LTY3MjQzMjEzNDQyOCIsInN1YiI6Im11c2thcm1vbmlzaEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJtTWFydCIsImNsaWVudElEIjoiMTA3NWU1ZWUtMTY2Yi00YzM5LWIwYzQtNjcyNDMyMTM0NDI4IiwiY2xpZW50U2VjcmV0IjoiQnJCbmJmTlhhSGZDaGFIeCIsIm93bmVyTmFtZSI6Ik11c2thciBNb25pc2giLCJvd25lckVtYWlsIjoibXVza2FybW9uaXNoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxRUcxMDdCMjIifQ.iCPGtnoLdB-HNfoNLzm3rzw0yBdKjHrGgQzIjFzDwOI';

const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  
  app.get('/products', async (req, res) => {
      try {
          const response = await axios.get(url, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              httpsAgent: agent
          });
  
          const products = response.data;

          products.sort((a, b) => b.rating - a.rating);
  
          res.json(products);
  
      } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Failed to fetch data' });
      }
  });
  
  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/products`);
  });
