import singlePostImg from '../../../assets/images/SinglePostPhoto.svg';
import bloggerimage from '../../../assets/images/emon.jpeg';
import { Icon } from '@iconify/react';
import comment12Regular from '@iconify-icons/fluent/comment-12-regular';
import calenderIcon from '@iconify-icons/uim/calender';
import { useState } from 'react';
import Rating from 'react-simple-star-rating';

const BlogSinglePageComponents = () => {
  const [rating, setRating] = useState(0);
  // Catch Rating value
  const handleRating = rate => {
    setRating(rate);
    // Some logic
  };
  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-16'>
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 mt-48'>
            <div>
              <img src={singlePostImg} alt='' />
            </div>
            <div className='mt-10'>
              <h1 className='text-white text-2xl w-1/2'>
                Proin niudisns ex ac viverra justfefs viverra Ghaustresa
              </h1>
            </div>
            <div className='flex items-center justify-start space-x-3 md:space-x-2 sm:space-x-10 ml-0 mt-6 text-white '>
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
            <div className='mt-10'>
              <p className='text-white mb-6'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                voluptatem ullam molestiae blanditiis iure alias et unde
                accusamus porro officiis modi, nostrum dolorum neque odit
                doloribus, sequi necessitatibus beatae, placeat ipsa nesciunt
                excepturi voluptas illum id accusantium. Obcaecati ullam illo
                aliquid ad possimus iusto voluptatum unde sunt a consequuntur
                cumque sequi quis error minus expedita, distinctio laborum, rem
                sed quos adipisci dignissimos soluta velit! Incidunt aspernatur
                nemo accusamus, distinctio rem placeat error necessitatibus
                sapiente illo unde corrupti repellat ratione autem labore ullam
                sint nostrum quae, perspiciatis totam numquam officia in. Sit,
                impedit quidem nostrum optio facilis, exercitationem neque illum
                molestiae nesciunt sunt iste. Inventore sint corrupti esse,
                obcaecati aut fuga assumenda odit, ducimus eius expedita
                voluptas vero quisquam accusantium dolore magnam quis ratione
                excepturi explicabo aspernatur iusto eveniet, quia tenetur
                consequatur soluta. Nemo rem neque officia recusandae libero
                assumenda pariatur mollitia accusantium nesciunt sequi molestiae
                animi rerum odit iure nihil impedit temporibus laboriosam, ea
                nam vel. Vero tenetur doloremque, earum aliquam nihil debitis
                odio deserunt quam necessitatibus totam id impedit quidem
                explicabo, illo quo exercitationem veniam magni vitae! Nobis
                unde nisi deleniti molestiae quod labore at ducimus dolorum.
                Officiis excepturi deserunt repellendus consectetur error ipsum
                fuga ea, tempora similique asperiores.
              </p>
              <p className='text-white mb-6'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                voluptatem ullam molestiae blanditiis iure alias et unde
                accusamus porro officiis modi, nostrum dolorum neque odit
                doloribus, sequi necessitatibus beatae, placeat ipsa nesciunt
                excepturi voluptas illum id accusantium. Obcaecati ullam illo
                aliquid ad possimus iusto voluptatum unde sunt a consequuntur
                cumque sequi quis error minus expedita, distinctio laborum, rem
                sed quos adipisci dignissimos soluta velit! Incidunt aspernatur
                nemo accusamus, distinctio rem placeat error necessitatibus
                sapiente illo unde corrupti repellat ratione autem labore ullam
                sint nostrum quae, perspiciatis totam numquam officia in. Sit,
                impedit quidem nostrum optio facilis, exercitationem neque illum
                molestiae nesciunt sunt iste. Inventore sint corrupti esse,
                obcaecati aut fuga assumenda odit, ducimus eius expedita
                voluptas vero quisquam accusantium dolore magnam quis ratione
                excepturi explicabo aspernatur iusto eveniet, quia tenetur
                consequatur soluta. Nemo rem neque officia recusandae libero
                assumenda pariatur mollitia accusantium nesciunt sequi molestiae
                animi rerum odit iure nihil impedit temporibus laboriosam, ea
                nam vel. Vero tenetur doloremque, earum aliquam nihil debitis
                odio deserunt quam necessitatibus totam id impedit quidem
                explicabo, illo quo exercitationem veniam magni vitae! Nobis
                unde nisi deleniti molestiae quod labore at ducimus dolorum.
                Officiis excepturi deserunt repellendus consectetur error ipsum
                fuga ea, tempora similique asperiores.
              </p>
              <p className='text-white mb-6'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                voluptatem ullam molestiae blanditiis iure alias et unde
                accusamus porro officiis modi, nostrum dolorum neque odit
                doloribus, sequi necessitatibus beatae, placeat ipsa nesciunt
                excepturi voluptas illum id accusantium. Obcaecati ullam illo
                aliquid ad possimus iusto voluptatum unde sunt a consequuntur
                cumque sequi quis error minus expedita, distinctio laborum, rem
                sed quos adipisci dignissimos soluta velit! Incidunt aspernatur
                nemo accusamus, distinctio rem placeat error necessitatibus
                sapiente illo unde corrupti repellat ratione autem labore ullam
                sint nostrum quae, perspiciatis totam numquam officia in. Sit,
                impedit quidem nostrum optio facilis, exercitationem neque illum
                molestiae nesciunt sunt iste. Inventore sint corrupti esse,
                obcaecati aut fuga assumenda odit, ducimus eius expedita
                voluptas vero quisquam accusantium dolore magnam quis ratione
                excepturi explicabo aspernatur iusto eveniet, quia tenetur
                consequatur soluta. Nemo rem neque officia recusandae libero
                assumenda pariatur mollitia accusantium nesciunt sequi molestiae
                animi rerum odit iure nihil impedit temporibus laboriosam, ea
                nam vel. Vero tenetur doloremque, earum aliquam nihil debitis
                odio deserunt quam necessitatibus totam id impedit quidem
                explicabo, illo quo exercitationem veniam magni vitae! Nobis
                unde nisi deleniti molestiae quod labore at ducimus dolorum.
                Officiis excepturi deserunt repellendus consectetur error ipsum
                fuga ea, tempora similique asperiores.
              </p>
              <p className='text-white mb-6'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                voluptatem ullam molestiae blanditiis iure alias et unde
                accusamus porro officiis modi, nostrum dolorum neque odit
                doloribus, sequi necessitatibus beatae, placeat ipsa nesciunt
                excepturi voluptas illum id accusantium. Obcaecati ullam illo
                aliquid ad possimus iusto voluptatum unde sunt a consequuntur
                cumque sequi quis error minus expedita, distinctio laborum, rem
                sed quos adipisci dignissimos soluta velit! Incidunt aspernatur
                nemo accusamus, distinctio rem placeat error necessitatibus
                sapiente illo unde corrupti repellat ratione autem labore ullam
                sint nostrum quae, perspiciatis totam numquam officia in. Sit,
                impedit quidem nostrum optio facilis, exercitationem neque illum
                molestiae nesciunt sunt iste. Inventore sint corrupti esse,
                obcaecati aut fuga assumenda odit, ducimus eius expedita
                voluptas vero quisquam accusantium dolore magnam quis ratione
                excepturi explicabo aspernatur iusto eveniet, quia tenetur
                consequatur soluta. Nemo rem neque officia recusandae libero
                assumenda pariatur mollitia accusantium nesciunt sequi molestiae
                animi rerum odit iure nihil impedit temporibus laboriosam, ea
                nam vel. Vero tenetur doloremque, earum aliquam nihil debitis
                odio deserunt quam necessitatibus totam id impedit quidem
                explicabo, illo quo exercitationem veniam magni vitae! Nobis
                unde nisi deleniti molestiae quod labore at ducimus dolorum.
                Officiis excepturi deserunt repellendus consectetur error ipsum
                fuga ea, tempora similique asperiores.
              </p>
            </div>
            <div className='flext'>
              <div>
                <h1 className='text-white'>Rate This News</h1>
              </div>
              <div>
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={20}
                  label
                  transition
                  fillColor='orange'
                  emptyColor='gray'
                  className='foo' // Will remove the inline style if applied
                />
                {/* Use rating value */}
                {rating}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSinglePageComponents;
