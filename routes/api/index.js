const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h6> hey...hey...hey 404 Error Go Back GG </h6>');
});

module.exports = router;
