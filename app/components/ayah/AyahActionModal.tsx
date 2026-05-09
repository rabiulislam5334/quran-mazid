"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Book, Bookmark, Copy, Link as LinkIcon, Share2, X } from "lucide-react";

interface AyahActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayahNumber: string;
}

const ACTIONS = [
  { icon: <Play size={20} />, label: "Play" },
  { icon: <Book size={20} />, label: "Tafsir" },
  { icon: <Bookmark size={20} />, label: "Bookmark" },
  { icon: <Copy size={20} />, label: "Ayah Copy" },
  { icon: <LinkIcon size={20} />, label: "Copy Link" },
  { icon: <Share2 size={20} />, label: "Ayah Share" },
];

export function AyahActionModal({ isOpen, onClose, ayahNumber }: AyahActionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a2e1a] rounded-t-[2.5rem] p-6 pb-10 shadow-2xl md:hidden"
          >
            {/* Handle Bar */}
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6" />

            <div className="space-y-2">
              {ACTIONS.map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-200"
                  onClick={() => {
                    console.log(action.label);
                    onClose();
                  }}
                >
                  <div className="text-gray-500 dark:text-gray-400">
                    {action.icon}
                  </div>
                  <span className="text-lg font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}