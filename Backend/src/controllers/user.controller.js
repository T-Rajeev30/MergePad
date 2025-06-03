import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUser = req.user; // assume req.user is set by auth middleware
    const currentUserId = currentUser._id;

    console.log("Current User:", currentUserId);

    const recommendedUsers = await User.find({
      _id: { $ne: currentUserId }, // exclude self
      _id: { $nin: currentUser.friends }, // exclude friends
      isOnboarded: true, // only onboarded users
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullname profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
