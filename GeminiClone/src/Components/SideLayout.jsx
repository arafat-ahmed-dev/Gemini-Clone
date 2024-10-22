import React, { useState } from "react";
import assets from "../assets/assets";

const SideLayout = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div className={isClick ? "w-1/7" : "w-1/5 "}>
      <div className="w-full h-screen bg-gray-700 text-white fill-white px-5">
        <div className="h-1/6 flex flex-col justify-between pt-5 cursor-pointer">
          <div className="w-full px-3">
            <img
              onClick={() => setIsClick(!isClick)}
              src={assets.menu}
              alt=""
              className="w-5 cursor-pointer fill-blue-500 "
            />
          </div>
          <div className="w-fit h-fit flex items-center justify-between bg-[#32373d] gap-1 rounded-full p-3">
            <img src={assets.plus} className="w-5 fill-blue-500 mx-1" />
            {!isClick ? <p>New Chart</p> : null}
          </div>
        </div>
        <div className={isClick? "hidden":"h-1/2 pt-6"}>
          <p className="text-[16px]">Recent</p>
          <div className="flex gap-4 items-center justify-start mt-3 rounded-md pt-2">
            <img src={assets.message} alt="" className="w-4" />
            <p>Message</p>
          </div>
        </div>
        <div className="absolute bottom-0 mb-5 h-1/5">
          <ul>
            <li className="flex gap-4 items-center justify-start cursor-pointer rounded-md p-2">
              <span>
                <img src={assets.help} alt="" className="w-5" />
              </span>
              <p className={isClick ? "hidden": null}>Help</p>
            </li>
            <li className="flex gap-4 items-center justify-start cursor-pointer rounded-md p-2">
              <span>
                <img src={assets.history} alt="" className="w-5" />
              </span>
              <p className={isClick ? "hidden": null}>History</p>
            </li>
            <li className="flex gap-4 items-center justify-start cursor-pointer rounded-md p-2">
              <span>
                <img src={assets.setting} alt="" className="w-5" />
              </span>
              <p className={isClick ? "hidden": null}>Settings</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideLayout;
