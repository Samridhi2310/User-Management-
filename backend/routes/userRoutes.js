const express=require("express")
const authMiddleware=require("../middleware/authMiddleware")

const {CreateUser,CheckUser,VerifyToken,GetUserDetails,DeleteUser,UpdateUser,LogoutUser}=require("../controller/useController")
const router = express.Router(); // ✅ Define router correctly
router.post("/signup",CreateUser);
router.post("/login",CheckUser);
router.get("/verify-token",authMiddleware,VerifyToken);
router.get("/userDetail",authMiddleware,GetUserDetails)
router.delete("/delete/:id",DeleteUser);
router.put("/update",authMiddleware,UpdateUser);
router.post("/logout",LogoutUser);

module.exports=router;