import React from 'react';
import SectionHeader from '../Typographys/Headings/SectionHeader';
import logo from '../../assets/images/xattorney-small-logo.svg';
import MiniBlogPostComponents from './MiniBlogPostComponents';
// import topgrass1 from '../../../assets/images/yellow-top-left.svg';
// import topgrass2 from '../../../assets/images/yellow-top-right.svg';
// import bottomgrass from '../../../assets/images/yellow-bottom-leaf.svg';
import blogimage2 from '../../assets/images/Justice-Photo 1.svg';
import blogimage3 from '../../assets/images/closeup-green-traffic-light-evening.svg';
import blogimage4 from '../../assets/images/blog-image-3.svg';
import bloggerimage from '../../assets/images/emon.jpeg';
import { Icon } from '@iconify/react';
import comment12Regular from '@iconify-icons/fluent/comment-12-regular';
import calenderIcon from '@iconify-icons/uim/calender';
import SmallBlogPostComponents from './SmallBlogPostComponents';
import blogBg1 from '../../assets/images/small-bg-1.svg';

const BlogsPageComponents = () => {
  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-16'>
          <div className='mt-48'>
            <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4'>
              <img src={logo} alt='' />
            </div>
            <SectionHeader width='md:w-109 w-full' />
          </div>
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 '>
            <div className='flex justify-start items-center mb-6'>
              <h1 className='text-white text-2xl border-b-2 border-secondarydark'>
                Recent
              </h1>
            </div>
            <div className='flex md:flex-row flex-col justify-between items-center md:space-x-6 space-x-0 md:space-y-0 space-y-6  w-full'>
              {/* blog details section  */}
              <div
                onClick={() =>
                  window.open(
                    'https://www.the-daily-story.com/history-of-bangladesh-high-court/',
                    '_blank'
                  )
                }
                className=' md:w-1/2 w-full h-102 rounded relative blog-bg px-1 sm:px-8 md:px-2 py-7 text-white cursor-pointer'
              >
                <div className='flex flex-col justify-between h-full'>
                  <span className='w-24 h-6 flex justify-center items-center bg-secondarydark rounded self-end'>
                    Today
                  </span>
                  <div className='flex flex-col space-y-5'>
                    <h1 className='font-medium text-base leading-relaxed w-full sm:w-2/3 ml-4'>
                      Proin niudisns ex ac viverra justfefs viverra Ghaustresa
                    </h1>
                    <div className='flex items-center justify-start space-x-3 md:space-x-2  sm:space-x-10 ml-4 '>
                      <div className='w-10 h-10 rounded-full'>
                        <img
                          className='w-10 h-10 rounded-full'
                          src={bloggerimage}
                          alt=''
                        />
                      </div>
                      <div className='flex space-x-1 sm:space-x-3 items-center text-xs sm:text-sm'>
                        <div className='flex space-x-2 items-center border-r border-white pr-3'>
                          <Icon className='text-lg' icon={calenderIcon} />
                          <span>16 Jun, 2021</span>
                        </div>
                        <div className='flex space-x-2 items-center cursor-pointer'>
                          <Icon className='text-lg' icon={comment12Regular} />
                          <span>3 Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* blog list */}
              <div className='flex flex-col justify-between lg:space-y-0 space-y-6 h-102  md:w-1/2 w-full'>
                <MiniBlogPostComponents
                  link='https://www.the-daily-story.com/syed-mahmud-hossain-the-chief-justice-of-bangladesh/'
                  img={blogimage2}
                  title='Syed Mahmud Hossain- The chief justice of Bangladesh'
                  date='19 Jun, 2021'
                  comment='15'
                  tag='Today'
                />
                <MiniBlogPostComponents
                  link='https://www.the-daily-story.com/new-traffic-safety-laws-of-bangladesh-in-2021/'
                  img={blogimage3}
                  title='New Traffic Safety Laws of Bangladesh in 2021'
                  date='19 Jun, 2021'
                  comment='9'
                  tag='Today'
                />
                <MiniBlogPostComponents
                  link='https://www.the-daily-story.com/xattorney-the-best-case-chamber-management-system-for-advocates/'
                  img={blogimage4}
                  title='XATTORNEY - The Best Case & Chamber Management System For Advocates'
                  date='19 Jun, 2021'
                  comment='34'
                  tag='Today'
                />
              </div>
            </div>
            <div>
              <div className='flex justify-start items-center mb-6 mt-10'>
                <h1 className='text-white  border-b-2 border-secondarydark'>
                  Top Blogs
                </h1>
              </div>
              <div className='flex justify-between mt-10 space-x-4 flex-wrap'>
                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />

                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />

                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />
                <div className='flex items-end'>
                  <button className='border border-secondarydark text-white text-xs 2xl:text-sm p-3'>
                    Read More
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-start items-center mb-6 mt-10'>
                <h1 className='text-white  border-b-2 border-secondarydark'>
                  Top News
                </h1>
              </div>
              <div className='flex justify-between mt-10 space-x-10'>
                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />

                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />

                <SmallBlogPostComponents
                  img={blogBg1}
                  title={`Proin niudisns ex ac viverra justfefs viverra Ghaustresa`}
                />
                <div className='flex items-end'>
                  <button className='border border-secondarydark text-white text-sm p-3'>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPageComponents;
