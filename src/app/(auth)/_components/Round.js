import Image from 'next/image'
import React from 'react'

const Round = () => {
    return (
        <div className=" lg:w-[50%] w-[100%] lg:mt-0 h-fit mt-32 flex items-center justify-center overflow-x-hidden">
            <div className=" w-[100%] lg:w-[50%] flex items-center justify-center lg:pb-0  ">
                <div className=" w-fit h-fit relative z-10 ">
                    <Image
                        height={100}
                        width={100}
                        src={"/logo.jpeg"}
                        alt=""
                        className="w-[18%] lg:w-[50%] rounded-full mx-auto "
                    />
                </div>
                <div className=" w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] rounded-full border border-purple-600 absolute animate-spin ">
                    <Image
                        src={"/logo.jpeg"}

                        alt=""
                        height={100}
                        width={100}
                        className=" w-[20%] rounded-full bottom-7 lg:bottom-11 absolute  animate-spin2"
                    />
                    <Image
                        src={"/logo.jpeg"}

                        alt=""
                        height={100}
                        width={100}
                        className=" w-[20%] rounded-full top-10 -right-2 lg:right-0 h-[20%] absolute animate-spin2"
                    />
                </div>
                <div className="w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] rounded-full border absolute  animate-spin ">
                    <Image
                        src={"/logo.jpeg"}

                        alt=""
                        height={100}
                        width={100}
                        className=" w-[15%] lg:w-[10%] rounded-full top-2 left-4 lg:left-24  absolute  animate-spin2 "
                    />
                    <Image
                        src={"/logo.jpeg"}

                        alt=""
                        height={100}
                        width={100}
                        className=" w-[20%] rounded-full bottom-3 lg:bottom-11 right-0 h-[20%] object-cover absolute animate-spin2"
                    />
                </div>
            </div>
        </div>
    )
}

export default Round