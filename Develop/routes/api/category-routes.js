const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) =>
      res.json(categories)).catch((err) =>
        res.status(500).json(err));
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.json(category)
    })
})



//       return Category.findAll({ where: { category_id: req.params.id } });
//     })
//     .then((product) => {

//       const categoryIds = Category.map(({ category_id }) => category_id);
//       // create filtered list of new tag_ids
//       const newCategoryId = req.body.tagIds
//         .filter((category_id) => !categoryIds.includes(category_id))
//         .map((category_id) => {
//           return {
//             category_id: req.params.id,
//             category_id,
//           };
//         });
//       // figure out which ones to remove
//       const categoryToRemove = Category
//         .filter(({ category_id }) => !req.body.categoryIds.includes(category_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         Category.destroy({ where: { id: categoryToRemove } }),
//         Category.bulkCreate(newCategoryId),
//       ]);
//     })
//     .then((updatedCategory) => res.json(updatedCategory))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

//delete category
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
