import React, { useEffect, useRef } from 'react';
import '../css/Dashboard.css';
import masonryImage1 from '../Masonry/masonry-image1.jpg';
import masonryImage2 from '../Masonry/masonry-image2.jpg';
import masonryImage3 from '../Masonry/masonry-images3.jpg';

const Dashboard = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollImages = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1; // Adjust speed
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0; // Restart from the beginning
        }
      }
    };

    const interval = setInterval(scrollImages, 30); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to the Masonry Dashboard!</h1>
        <p>Your one-stop platform for masonry excellence and insights.</p>
      </div>
      <div className="dashboard-body">
        <div className="image-grid" ref={scrollRef}>
          <img src={masonryImage1} alt="Masonry 1" className="masonry-images" />
          <img src={masonryImage2} alt="Masonry 2" className="masonry-images" />
          <img src={masonryImage3} alt="Masonry 3" className="masonry-images" />
          <img src={masonryImage1} alt="Masonry 4" className="masonry-images" />
          <img src={masonryImage2} alt="Masonry 5" className="masonry-images" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
