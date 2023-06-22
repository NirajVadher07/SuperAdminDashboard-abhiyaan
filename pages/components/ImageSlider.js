import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const ImageSlider = ({ gallery }) => {
    const slides = []

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    if (gallery) {
        for (let index = 0; index < gallery.length; index++) {
            const element = gallery[index]?.attributes?.formats?.small?.url;
            const obj = { "url": `${process.env.NEXT_PUBLIC_URL}${element}` }
            slides.push(obj)
        }
    }
    // console.log("slides --> ", slides)

    return (
        <div>
            {
                slides.length > 0 ? (
                    <div className='h-[100vh] w-full m-auto py-16 px-4 relative group'>
                        <div
                            style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
                            className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                        ></div>
                        {/* Left Arrow */}
                        <div className='w-fit hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                            <BsChevronCompactLeft onClick={prevSlide} size={20} />
                        </div>
                        {/* Right Arrow */}
                        <div className='w-fit hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                            <BsChevronCompactRight onClick={nextSlide} size={20} />
                        </div>
                        <div className='flex top-4 justify-center py-2'>
                            {slides.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className={`text-2xl cursor-pointer ${slideIndex==currentIndex ? ("text-[#590DE1] mx-5") : ("")}`}
                                >
                                    <RxDotFilled />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )
            }
        </div>

    );
}

export default ImageSlider;