const router = require('express').Router();
const { CalorieInput, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const calorieInputData = await CalorieInput.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const calorieInputs = calorieInputData.map((calorieInput) => calorieInput.get({ plain: true }));
    res.render('homepage', {
      calorieInputs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/calorieInput/:id', async (req, res) => {
  try {
    const calorieInputData = await CalorieInput.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const calorieInput = calorieInputData.get({ plain: true });
    res.render('calorieInput', {
        calorieInput,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: CalorieInput }],
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
        user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});
module.exports = router;
