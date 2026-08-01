"use client";

import React from "react";
import { useUI } from "../context/UIContext";

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, videoUrl, closeVideoModal } = useUI();

  if (!isVideoModalOpen) return null;

  return (
    <div
      className="video-modal active"
      id="videoModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeVideoModal();
      }}
    >
      <div className="video-modal-content">
        <button className="video-modal-close" onClick={closeVideoModal}>
          &times;
        </button>
        <div className="video-container-iframe">
          <iframe
            id="youtubeFrame"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
