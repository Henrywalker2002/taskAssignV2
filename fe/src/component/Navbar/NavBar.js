import React from "react";



const NavBar = () => {
    return (
        <div className='flex  h-14 bg-[#536F4A] relative w-full'>
        <a className='w-1/5 flex-wrap font-bold ml-10 mt-3 text-xl' href="/" > Home </a>
        <a className='w-4/5 flex-wrap font-bold  text-xl  mt-3' href="/login"> Login </a>
    </div>
    )
}

export default NavBar;


