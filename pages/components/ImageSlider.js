import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
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
                    <div className='h-[80vh] w-full pb-16 relative group'>
                        <div
                            style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
                            className='w-full h-full bg-center bg-cover duration-500 flex justify-between items-center'
                        >
                            <div className='m-2 p-2 opacity-50'>
                                <BsFillArrowLeftCircleFill className="text-4xl bg-gray-200 rounded-full" onClick={prevSlide} />
                            </div>
                            <div className='m-2 p-2 opacity-50'>
                                <BsFillArrowRightCircleFill className="text-4xl bg-gray-200 rounded-full" onClick={nextSlide} />
                            </div>
                        </div>
                        <div className='flex top-4 justify-center py-2'>
                            {slides.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className={`text-4xl cursor-pointer ${slideIndex == currentIndex ? ("text-[#590DE1] mx-5 transition-all") : ("")}`}
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