// import React from 'react';
// import Slider from 'react-slick';
// import { Box } from '@mui/material';

// const ImageCarousel = ({ images }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   const filteredImages = images.filter(img => img?.image);

//   return (
//     <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
//         <Slider {...settings}>
//             {filteredImages.map((img, index) => (
//                 <Box key={index} component="div">
//                 <img
//                     src={img.image}
//                     alt={`Product ${index}`}
//                     style={{ width: '100%', height: 'auto', borderRadius: 8 }}
//                 />
//                 </Box>
//             ))}
//         </Slider>
//     </Box>
//   );
// };

// export default ImageCarousel;
