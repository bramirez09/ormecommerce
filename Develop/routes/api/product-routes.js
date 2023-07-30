const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// find all products
// be sure to include its associated Category and Tag data
router.get('/', (req, res) => {
  Product.findAll({
    include:[Category,Tag],
  })
  .then((product)=>
    res.json(product)).catch((err)=>
      res.status(500).json(err));
})

// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
  } catch (err) {
    res.status(400).json(err);
  }
  Product.create(req.body)
    .then((product) => {
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      // return ProductTag.findAll({ where: { product_id: req.params.id } });
      res.json(product)
    })
    })

  // delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!productData) {
      res.status(404).json({message:'No product found with this id!'});
      return;
    }
    res.status(404).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
