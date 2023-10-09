const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom')

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()

      })

    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

 find() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.products)
    }, 5000);
  })

  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if(!product) {
      throw boom.notFound('Product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is Block')
    }
    return product

  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products[index] = {
        ...this.products[index],
        ...changes
      }
      return this.products[index]
    }
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    } else {
      this.products.splice(index, 1)
      return { message: 'Product ' + id + ' deleted'}
    }
  }

}

module.exports = ProductsService
