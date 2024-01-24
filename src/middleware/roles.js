export const forAdminOnly = (req, res, next) => {
  const user = req.user;
  if(user.isAdmin) {
    next();
  }
  return res.status(403).json({
    statusCode: 403,
    message: "Not authorized to perform this action"
  })
}