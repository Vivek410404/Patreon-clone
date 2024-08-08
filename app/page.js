import React from 'react'
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white">
        <div className="flex flex-col h-[35vh] p-4 justify-center items-center gap-3">
          <div className="text-3xl flex justify-center items-center h-50px gap-1 mt-3">
            <span>Buy me a Coffee</span>
            <span >
              <lord-icon src="https://cdn.lordicon.com/cengyxkh.json" trigger="loop" style={{ width: "50px", height: "50px" }}></lord-icon>
            </span>
          </div>
          <div className=" flex flex-col gap-1 items-center justify-center">
            <p className="flex" >
              A crowdfunding platform for creators.Get funded by your fans and followers.Start Now!
            </p>
            <p className="flex">
              A place where your friend can buy you a chai. Unleash the Power of your fans and get your project funded.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Start Now</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Read More</button>
          </div>
        </div>
        <div className="bg-gray-700 h-1 w-full absolute top-64 m-4"></div>
        <div className="flex  justify-center container mx-auto items-center flex-col w-full my-10">
          <h1 className="text-2xl my-4 px-4">Your friends Can buy you a coffee</h1>
          <div className="flex my-8 justify-center container px-4">
            <div className="item flex items-center justify-center flex-col w-full">
              <img className="w-[88px] mt-0 m-4" alt="Employee, Animated Icon, Gradient" src="https://lordicon.com/icons/wired/flat/1846-employee-working.svg" />
              <p className="text-sm">Fund Yourself</p>
              <p className="text-sm text-center w-1/2">Your friends are available to help you</p>
            </div>
            <div className="item flex items-center justify-center flex-col w-full">
              <span>
                <lord-icon src="https://cdn.lordicon.com/yfrgwbag.json" trigger="loop" style={{ margin: "4px", width: "88px", height: "88px" }}>
                </lord-icon>
              </span>
              <p className="text-sm">Fund Yourself</p>
              <p className="text-sm text-center w-1/2">Your friends are available to help you</p>
            </div>
            <div className="item flex items-center justify-center flex-col w-full">
              <img className="w-[88px] mt-0 m-4" alt="Employee, Animated Icon, Gradient" src="https://lordicon.com/icons/wired/flat/314-three-avatars-icon-calm.svg" />
              <p className="text-sm text-center">Friends want to help</p>
              <p className="text-sm text-center w-1/2">Your friends are available to help you</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 h-1 w-full "></div>
        <div className="flex  justify-center container mx-auto items-center flex-col w-full my-10">
          <h1 className="text-2xl my-4 mb-8">Learn about us</h1>
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=6Eusbr9NOTbig_ia" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        </div>

      </div>
    </>
  );
}
