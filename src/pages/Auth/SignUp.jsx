import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import AuthLayout from "../../components/layouts/AuthLayout";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [profilePic, setprofilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [fullName, setFullName] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // handle signup form submit
  const handleSignUp = async (event) => {
    event.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter a full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    // SignUp API
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      }

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, Please try again later!");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join is today by entering below details!
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password"
            />
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Code"
              placeholder="6 digit code"
              type="text"
            />
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          </div>
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
