"use client";

import { useGmailProfile } from "@/lib/hooks/useGmailProfile";

const GmailProfileWatcher = () => {
  useGmailProfile();
  return null; 
};

export default GmailProfileWatcher;