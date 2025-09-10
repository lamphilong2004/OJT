const db = require('../db');
const { logger } = require('../utils/logger');

/**
 * Get current user info
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get user from database
    const result = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error('Get Current User Error:', error);
    next(error);
  }
};

module.exports = {
  getCurrentUser
};
