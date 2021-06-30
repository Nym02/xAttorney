import { Icon } from '@iconify/react';
import comment12Regular from '@iconify-icons/fluent/comment-12-regular';
import calenderIcon from '@iconify-icons/uim/calender';
import Paper from '@material-ui/core/Paper';

export default function CommunityBlogCard({
  title,
  date,
  img,
  comment,
  tag,
  link,
}) {
  return (
    <>
      <Paper
        elevation={4}
        className='2xl:w-92 bg-lightSilver shadow-lg rounded sm:p-3 p-1 flex sm:flex-row flex-col sm:h-34 h-auto items-center cursor-pointer sm:space-y-0 space-y-3'
        onClick={() => window.open(`${link}`, '_blank')}
      >
        <div style={{ height: '103px', width: '113px' }}>
          <img src={img} alt='' />
        </div>
        <div className='text-primarydark space-y-2 w-2/3'>
          <h1 className='text-sm sm:text-left text-center'>{title}</h1>
          <span className='w-24 h-6 flex justify-center items-center bg-secondarydark rounded self-end text-white'>
            {tag}
          </span>
          <div className='flex items-center sm:text-xsm text-xs space-x-2'>
            <div className='flex space-x-1 items-center'>
              <Icon className='text-base' icon={calenderIcon} />
              <span>{date}</span>
            </div>
            <div className='flex space-x-1 items-center'>
              <Icon className='text-base' icon={comment12Regular} />
              <span>{comment} Comments</span>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
