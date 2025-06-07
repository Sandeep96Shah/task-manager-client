import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, value, onChange, type, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleToggle = () =>
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  return (
    <div>
      <label htmlFor="" className="text-[13px] text-slate-800">
        {label}
      </label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (isShowPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(event) => onChange(event)}
        />
        {type === "password" && (
          <>
            {isShowPassword ? (
              <FaRegEye
                size={22}
                className=" text-primary cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={handleToggle}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
