"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LeadPopupType = "quote" | "brochure";

interface UIContextType {
  isLeadPopupOpen: boolean;
  leadPopupType: LeadPopupType;
  openLeadPopup: (type: LeadPopupType) => void;
  closeLeadPopup: () => void;
  isVideoModalOpen: boolean;
  videoUrl: string;
  openVideoModal: (url: string) => void;
  closeVideoModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);
  const [leadPopupType, setLeadPopupType] = useState<LeadPopupType>("brochure");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const openLeadPopup = (type: LeadPopupType) => {
    setLeadPopupType(type);
    setIsLeadPopupOpen(true);
  };

  const closeLeadPopup = () => {
    setIsLeadPopupOpen(false);
  };

  const openVideoModal = (url: string) => {
    setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoUrl("");
    setIsVideoModalOpen(false);
  };

  // Automatic trigger brochure popup has been disabled as requested.
  // Popup will only open when explicitly triggered by action buttons.

  return (
    <UIContext.Provider
      value={{
        isLeadPopupOpen,
        leadPopupType,
        openLeadPopup,
        closeLeadPopup,
        isVideoModalOpen,
        videoUrl,
        openVideoModal,
        closeVideoModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
