import { User } from '@firebase/auth'

/**
 * 
 * @param {User} user 
 */
export function updateUser(user) {
  if (!Noodl.Object.exists("firebase.user")) {
    Noodl.Object.create({ id: "firebase.user" });
  }
  
  const userObj = Noodl.Object.get("firebase.user");
  userObj.set("uid", user.uid);
  userObj.set("displayName", user.displayName);
  userObj.set("email", user.email);
  userObj.set("photoURL", user.photoURL);
}
