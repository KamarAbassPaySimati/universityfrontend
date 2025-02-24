// import React, { useState } from 'react';

// const CustomMarker = ({ text }) => {
//     const [showTooltip, setShowTooltip] = useState(false);

//     const handleMouseEnter = () => {
//         setShowTooltip(true);
//     };

//     const handleMouseLeave = () => {
//         setShowTooltip(false);
//     };

//     return (
//         <div className="relative">
//             <div
//                 className="h-3 w-3 rounded-full bg-red-600 cursor-pointer"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             ></div>
//             {showTooltip && (
//                 <div className="absolute top-0 left-0 mt-4 ml-4 bg-white shadow-md p-2 rounded-md z-10">
//                     <p className="text-red-700">{text}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomMarker;
