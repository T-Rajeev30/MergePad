import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
export async function getRecommendedUsers(req, res) {
  try {
    const currentUser = req.user; // assume req.user is set by auth middleware
    const currentUserId = currentUser._id;

    // console.log("Current User:", currentUserId);

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

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientID } = req.params;

    ///// prevent sending request to yourslef
    if (myId == recipientID) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }
    /// check if user is already friend
    const recipient = await User.findById(recipientID);
    if (!recipient) {
      return res.status(404).json({ message: "Recipients not found" });
    }

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    /// check if a request is already exists

    const existingRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: myId,
          recipients: recipientID,
        },
        {
          sender: recipientID,
          recipient: myId,
        },
      ],
    });
    if (!existingRequest) {
      return res.status(400).json({
        message: " A friends request already exists between you and this user ",
      });
    }

    // first friends request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipients: recipientID,
    });
    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error is send Friends request controller ", error.message);
    res.status(500).json({ message: "internal Server Error " });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(401).json({ message: " friend request not found" });
      /// verify the current user in the recipients
    }
    if (friendRequest.recipients.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept the request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user  to the other's friends array
    // $addToSet: adds element to an array only if they do not already exist
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipients },
    });

    await User.findByIdAndUpdate(friendRequest.recipients, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted " });
  } catch (error) {
    console.log("Error in acceptFriendRequest Controller ", error.message);
    res.status(500).json({ message: " Internal Server Error " });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequset  controller", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log("Error in OutgoingFriendRequset  controller", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
}
