const asyncHandler = require('express-async-handler')

const Reitti = require('../models/reittiModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getReitit = asyncHandler(async (req, res) => {
  const reitit = await Reitti.find({ user: req.user.id })

  res.status(200).json(reitit)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setReitti = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const reitti = await Reitti.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(reitti)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateReitti = asyncHandler(async (req, res) => {
  const reitti = await Reitti.findById(req.params.id)

  if (!reitti) {
    res.status(400)
    throw new Error('reitti not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (reitti.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedReitti = await Reitti.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedReitti)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteReitti = asyncHandler(async (req, res) => {
  const reitti = await Reitti.findById(req.params.id)

  if (!reitti) {
    res.status(400)
    throw new Error('reitti not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (reitti.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await reitti.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getReitit,
  setReitti,
  updateReitti,
  deleteReitti,
}