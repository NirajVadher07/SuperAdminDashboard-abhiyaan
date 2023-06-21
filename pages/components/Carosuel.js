import React from 'react'
import { Carousel } from "@material-tailwind/react";


const Carosuel = ({ gallery }) => {
    console.log(gallery)
    return (
        <Carousel
            className=""
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            {/* {gallery && gallery.map((photo,index) => {
                <img
                    src={`http://65.20.79.129:1337/${photo?.attributes?.formats?.large?.url}`}
                    alt={`image ${index+1}`}
                    className="h-full w-full object-cover"
                />
            })} */}
            <img
                src="https://images.pexels.com/photos/5227440/pexels-photo-5227440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="image 1"
                className="h-full w-full object-cover"
            />
             <img
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="image 2"
                className="h-full w-full object-cover"
            />
        </Carousel>
    )
}

export default Carosuel
