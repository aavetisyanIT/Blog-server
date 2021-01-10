const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

//blog home route
router.get('/', blogController.blog_index);

//create new blog
router.post('/', blogController.blog_create_post);

//create blog
router.get('/create', blogController.blog_create_get);

//single blog page detail
router.get('/:id', blogController.blog_details);

//delete blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;
