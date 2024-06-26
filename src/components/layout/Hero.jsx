import Image from 'next/image';
import React from 'react';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Link from 'next/link';

const Hero = () => {
  return (
    <section
    className='hero mt-4'
    >
        <div
        className='py-12'
        >
            <h1
            className='text-4xl font-semibold'
            >
                Everything<br/> is better<br/> with a&nbsp;
                <span className='text-primary'>Pizza</span>
            </h1>
            <p
            className='my-6 text-gray-500 text-sm'
            >
                Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
            </p>
            <div
            className='flex gap-4'
            >
                <Link
                className='bg-primary text-white px-4 py-2 rounded-full flex gap-2 items-center uppercase cursor-pointer'
                href="/menu"
                >
                    Order now
                    <HiOutlineArrowCircleRight className='w-6 h-6'/>
                </Link>
                <Link
                className='flex gap-2 py-2 items-center text-gray-400 font-semibold cursor-pointer'
                href="#about"
                >
                    Learn more
                    <HiOutlineArrowCircleRight className='w-6 h-6'/>
                </Link>
            </div>
        </div>
        <div
        className='relative rotatingPizza'
        >
            <Image src={'/pizza.png'} width={659} height={653} alt={'pizza'}/>
        </div>
    </section>
  )
}

export default Hero