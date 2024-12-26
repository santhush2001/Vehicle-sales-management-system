import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MediaViewerUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mediaItem, mediaList, vehicleId } = location.state || {};

  if (!mediaItem || !mediaList || !vehicleId) {
    return <div>Media not found</div>;
  }

  const currentIndex = mediaList.findIndex((item) => item.id === mediaItem.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % mediaList.length;
    navigate("/user-media-viewer", { state: { mediaItem: mediaList[nextIndex], mediaList, vehicleId } });
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    navigate("/user-media-viewer", { state: { mediaItem: mediaList[prevIndex], mediaList, vehicleId } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative">
      <button
        onClick={() => navigate(`/buy/${vehicleId}`)} // Navigate back to the Buy page
        className="absolute top-5 left-5 text-white text-xl bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
      >
        &larr; Back
      </button>

      {/* Left Arrow for Previous Media */}
      <button
        onClick={handlePrev}
        className="absolute left-10 text-white text-3xl bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
      >
        &#8592;
      </button>

      <img
        src={`http://127.0.0.1:8000/storage/${mediaItem.file_path}`}
        alt={`Full view of ${mediaItem.file_path}`}
        className="max-w-full max-h-full object-contain"
      />

      {/* Right Arrow for Next Media */}
      <button
        onClick={handleNext}
        className="absolute right-10 text-white text-3xl bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MediaViewerUser;
