import * as userService from "../services/user.service.js";

export async function getMyProfileController(req, res) {
  try {
    const result = await userService.getProfile(req.userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}
