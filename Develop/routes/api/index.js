const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

categoryRoutes.belongsToMany(productRoutes,{
    through:{
        model:'productRoutes',
        unique: false
    },
    as: 'product_category'
});

productRoutes.belongsToMany(tagRoutes,{
    through:{
        model:"tagRoutes",
        unique:false
    },
    as:'tagged_product'
});

tagRoutes.belongsToMany(productRoutes,{
    through:{
        model: "productRoutes",
        unique: false
    },
    as: 'product_tag'
})

module.exports = router;
