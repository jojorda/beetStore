const Profile = () => {
  return (
    <>
      <div className="mt-10 p-10 flex">
        <div className="w-1/4 pl-10">Foto</div>
        <div>
          <form className="pl-5 w-80">
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  className="block rounded-xl border border-[#6E205E] w-full p-2.5  text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                  placeholder="Name"
                  required
                />
              </div>
            </div>
            <div className="mb-5"> 
              <div className="relative">
                <input
                  type="text"
                  className="block rounded-xl border w-full p-2.5 border-[#6E205E] text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  className="block rounded-xl border w-full p-2.5 border-[#6E205E] text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  className="block rounded-xl border w-full p-2.5 border-[#6E205E] text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                  placeholder="Address"
                  required
                />
              </div>
            </div>

            <div className="">
              <div className="mt-10 -ml-10 mr-10">
                <button
                  type="submit"
                  className="shadow-lg w-full px-5 py-1  text-white  bg-[#6E205E] rounded-lg hover:bg-[#8f397c] focus:outline-none focus:bg-[#8f397c]"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
