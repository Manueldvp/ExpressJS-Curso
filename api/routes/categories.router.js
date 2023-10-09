const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  for (let index = 0; index < 5; index++) {
    categories.push({
      name: faker.commerce.department(),
      id: index
    })

  }
  res.json(categories)
})

router.get('/categories/:categoryId/', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId
  })
})


module.exports = router;
