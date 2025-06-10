import NavBar from "../components/NavBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState, useEffect } from "react";
import { setAccDetails } from "../redux/Auth/accountDetails";
import { Input } from "/Users/macbook/cookie-auth-app/src/components/ui/input";
import { setProfilePic } from "../redux/Auth/profilePic";

const Profile = () => {
  const selector = useAppSelector((state) => state);
  const newUser = selector.account;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const response = await fetch("http://localhost:4080/api/single-user", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (!data.userInformation) {
          return;
        }

        dispatch(setAccDetails(data.userInformation));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleUser();
  }, [dispatch]);
  // Modal handler
  const [modalActivator, setModalActivator] = useState<boolean>(false);
  const [ newPic,setNewPic ] = useState<string>("");
  
  if (modalActivator) {
    document.body.style.overflow = "hidden"
  } else {
      document.body.style.overflow = "visible"
  }


  const changeProfilePic = async () => {
    try {
      const response = await fetch("http://localhost:4080/api/change-pic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUser.username, url: newPic }),
        credentials: "include"
      })
      const data = await response.json();

      if (!data.newUrl){
        return;
      }

      console.log(data);
    } catch (err) {
      console.error(err)
    }
  }

  const changePic = async () => {
    await changeProfilePic()
    setModalActivator(false);
  }

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const response = await fetch("http://localhost:4080/api/single-user", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (!data.userInformation) {
          return;
        }

        dispatch(setAccDetails(data.userInformation));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleUser();
  }, [modalActivator])
  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col items-center gap-6 min-h-screen py-40 ">
        <div className="w-full text-white flex justify-center">
           <img src={newUser.imgUrl} alt="Profile Picture" className="w-44 rounded-full h-44"/> 
        </div>

        {/* Information area */}
        <div className="w-full flex flex-col gap-4 items-center text-white ">
          <h1 className="font-extrabold text-2xl">
            Username: {newUser.username}
          </h1>
          <h3 className="font-bold text-xl">Password: {newUser.password}</h3>
        </div>
        {/* Change profile picture area */}
        <div className="w-full flex justify-center items-center">
          <button onClick={() => setModalActivator(true)}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white 
            font-bold hover:scale-105 hover:brightness-90 active:brightness-75 transition-all px-4 py-2 rounded-md "
          >
            Change Profile Picture
          </button>
        </div>
      </div>
      {/* Modal */}
      <div className={`w-full ${modalActivator ? "flex show-modal" : "hide-modal hidden"} inset-0 absolute z-10 bg-black/70 justify-center items-center`}>
          <div className="w-full h-fit
           bg-white rounded-md shadow-xl flex flex-col items-center gap-6 p-5
           max-w-sm
           md:max-w-md">

            <div className="w-full">
              <h1 className="font-extrabold text-xl">Profile Picture</h1>
            </div>

            <div className="w-full">
              <Input 
                value={newPic}
                onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setNewPic(e.target.value)}
                placeholder="URL" 
                className="h-14 border border-gray-500"
              />
            </div>
            
            <div className="w-full">
              <button onClick={changePic}
              className="w-full 
              bg-orange-500 text-white font-bold rounded-md 
               shadow-xl hover:brightness-90 active:brightness-75 transition-all h-10">
                Change
              </button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;
