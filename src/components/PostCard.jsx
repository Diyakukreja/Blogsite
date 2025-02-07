import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, fimage }) {
  // Ensure featuredImage is defined before calling getFilePreview()
  const previewUrl = fimage ? appwriteService.getFilePreview(fimage) : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        {previewUrl ? ( 
          <div className='w-full justify-center mb-4'>
            <img 
              src={previewUrl} 
              alt={title}
              className='rounded-xl' 
            />
          </div>
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-xl">
            <span className="text-gray-500">No Image</span> {/* Placeholder for missing images */}
          </div>
        )}
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;





// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}) {
    
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                 className='rounded-xl' />

//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard