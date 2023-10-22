"use client"
import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { explore_cards, glasses } from '@/utils'
import Link from 'next/link'
import Image from 'next/image'
import Auth from '@/app/auth/Auth'
import childAbi from '@/app/auth/abi/child.json'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation'

export default function HomeFeatures() {
  const { childAddress, provider, createWallet, isLoading, isConnected } = Auth();
  const [accountDetails, setAccountDetails] = useState([])
  const router = useRouter()

  useEffect(() => {
    if ((Object.keys(provider)).length > 0) {
      const contract = new ethers.Contract(childAddress, childAbi, provider?.getSigner());
      const readAccountDetails = async () => {
        const tx = await contract.viewAccount();
        setAccountDetails(tx);
      }
      readAccountDetails();
    } else {
      router.push('/');
    }
  }, [provider])

  return (

    <Layout>
      <div className='pt-20 pb-5'>
        <div className='md:flex'>
          <div>
            <div className="flex flex-wrap gap-10 text-white">
              {explore_cards.map((card, index) => (
                <div key={index} style={{ backgroundImage: `url(${card.bgCustom})` }} className=" bg-no-repeat p-4 rounded-[8px] min-w-[305px] h-[200px] flex flex-col items-between justify-between ">
                  <Link href={`/app?source=`} className="flex justify-end py-1">
                    <button className='bg-[#CDCFDE] py-1 px-4 rounded-lg text-[#0F4880]'>Explore &#8594;</button>
                  </Link>
                  <div className='text-white px-3'>
                    <span className='text-base block mb-1.5'>{card?.name}</span>
                    <span className="sm:text-2xl grotesk font-bold leading-[25.5px] tracking-[0.085px] mt-4 mb-2 text-2xl"> {card.name != "Number of Clubs" && "$"}{Number(accountDetails[index])}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Details */}
            <div className="flex scrollbar-hide overflow-x-scroll glass_bg sm:bg-transparent overflow-y-hidden gap-2 flex-nowrap items-en justify-between mt-8 sm:mt-10">
              {glasses?.map((glass, index) => (
                <Link href={glass.link} key={index} className="class flex justify-center items-center w-full gap-2 rounded-[24px] border py-2 px-1 text-base hover:cursor-pointer">
                  {glass.name}
                  <Image
                    src={glass.imagePath}
                    alt={`chain_img + ${index}`}
                    className="object-cover"
                    width={18}
                    height={18}
                  />
                </Link>
              ))}
            </div>

            {/* Transaction History */}
            <div className='mt-8 sm:my-10'>
              <div className='flex justify-between items-center'>
                <span className='font-bold text-lg'>Transaction History</span>
                <Link href="/history" className='flex items-center text-base text-[#696969] grotesk_font gap-1'>
                  <span>See more</span>
                  <span className=''>&#62;</span>
                </Link>
              </div>

              <div className='flex justify-between gap-8 w-full'>
                {[1, 2].map((i, j) => (
                  <div key={j} className='mt-8 sm:mt-10 p-4 transaction-card w-full'>
                    <div className='w-full min-w-[305px]'>
                      <div className='flex items-center justify-between w-full text-base text-[#696969] grotesk_font gap-2'>
                        <span>16th October</span>
                        <span className=''>Credit</span>
                      </div>

                      <div className='flex'>
                        <div className='flex items-center w-full gap-4 mt-8'>
                          <div className=' border-2 border-[#696969] rounded-full items-center flex justify-center w-10 h-10 p-1'>
                            <Image
                              src="/circle_next.svg"
                              alt={""}
                              className="object-cover w-full"
                              width={20}
                              height={20}
                            />
                          </div>

                          <div className='grid'>
                            <span className='font-bold text-lg'>Transfers</span>
                            <span className='text-[14px]'>Shopping</span>
                          </div>
                        </div>
                        <div className='block text-end w-full gap-4 mt-8'>
                          <span className='block text-end font-bold text-lg'>$47.00</span>
                          <span className='text-[14px]'>From wu33u....s6tr5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video_Opportunities */}
            <div className="block md:flex gap-10 text-white">
              <div className='block md:w-[50%] w-full border rounded-2xl bg-gray-500 pb-2'>
                <video
                  controls={true}
                  playsInline muted
                  loop
                  id="myVideo"
                  className={`m-auto bg-cover w- object-cover`}
                >
                  <source src="./spendNest.mp4" type="video/mp4" />
                  <source src="./spendNest.mp4" type="video/ogg" />
                  your browser does not support the video tag.
                </video>
                <span className='text-black w-full px-4 py-2 mt-2 block'>
                  Watch our goal getter video
                </span>
              </div>
              <div className="md:w-[50%] w-full">
                <span className='text-lg font-bold text-[#000]'>Opportunities For you</span>
                <div className='text-black mt-6'>
                  <div className='border flex px-4 rounded-md h-[130px] w-full'>
                    <div className='py-4 w-[80%] flex flex-col justify-between'>
                      <span className='w-[70%]'>Share Funds with Loved ones</span>
                      <Link href={`/app?source=`} className="w-fit pt-3 block">
                        <button className='py-1 px-4 rounded-lg text-[white] text-[17px] bg-[#0F4880]'>Start Now</button>
                      </Link>
                    </div>

                    <div className='border-l rounded-full flex justify-center'>
                      <Image
                        src="/flying_money.svg"
                        alt={""}
                        className="object-cover w-fit px-auto pl-4"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
                <div className='text-black mt-3'>
                  <div className='border flex px-4 rounded-md h-[130px] w-full'>
                    <div className='py-4 w-[80%] flex flex-col justify-between'>
                      <span>Overdraft your account</span>
                      <Link href={'services//overdraft'} className="w-fit pt-3 block">
                        <button className='py-1 px-4 rounded-lg text-[white] text-[17px] bg-[#0F4880]'>Start Now</button>
                      </Link>
                    </div>

                    <div className='border-l rounded-full flex justify-center'>
                      <Image
                        src="/flying_money.svg"
                        alt={""}
                        className="object-cover w-fit px-auto pl-4"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}
