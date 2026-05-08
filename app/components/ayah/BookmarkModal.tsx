"use client";

import { X, Bookmark, Plus, Folder } from "lucide-react";
import { useState, useEffect } from "react";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahId: number;
  verse: number;
  surahName: string;
  arabicText: string;
  translation: string;
}

interface BookmarkFolder {
  id: string;
  name: string;
  items: Array<{ surahId: number; verse: number; surahName: string }>;
}

export function BookmarkModal({ isOpen, onClose, surahId, verse, surahName, arabicText, translation }: BookmarkModalProps) {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("quran_bookmarks");
      if (stored) setFolders(JSON.parse(stored));
      else setFolders([{ id: "favorites", name: "Favorites", items: [] }]);
    } catch {
      setFolders([{ id: "favorites", name: "Favorites", items: [] }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const already = folders
        .filter((f) => f.items.some((i) => i.surahId === surahId && i.verse === verse))
        .map((f) => f.id);
      setSelected(already);
    }
  }, [isOpen, folders, surahId, verse]);

  const toggle = (folderId: string) => {
    setSelected((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]
    );
  };

  const handleDone = () => {
    const updated = folders.map((f) => {
      const hasItem = f.items.some((i) => i.surahId === surahId && i.verse === verse);
      const shouldHave = selected.includes(f.id);
      if (shouldHave && !hasItem) {
        return { ...f, items: [...f.items, { surahId, verse, surahName }] };
      } else if (!shouldHave && hasItem) {
        return { ...f, items: f.items.filter((i) => !(i.surahId === surahId && i.verse === verse)) };
      }
      return f;
    });
    try { localStorage.setItem("quran_bookmarks", JSON.stringify(updated)); } catch {}
    setFolders(updated);
    onClose();
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newFolder: BookmarkFolder = { id: Date.now().toString(), name: newName.trim(), items: [] };
    const updated = [...folders, newFolder];
    setFolders(updated);
    setSelected((prev) => [...prev, newFolder.id]);
    setNewName("");
    setCreating(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-text-primary">Add to Collections</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:bg-bg-hover transition">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button className="flex-1 py-2.5 text-sm font-medium text-gold border-b-2 border-gold">Bookmark</button>
          <button className="flex-1 py-2.5 text-sm text-text-muted hover:text-text-primary transition">Pin</button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <input
            type="text"
            placeholder="Search Bookmark Folder"
            className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50 transition"
          />
        </div>

        {/* Folder list */}
        <div className="max-h-48 overflow-y-auto">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => toggle(folder.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-hover transition text-left"
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition ${selected.includes(folder.id) ? "bg-gold border-gold" : "border-border"}`}>
                {selected.includes(folder.id) && <span className="text-bg-primary text-xs font-bold">✓</span>}
              </div>
              <Folder size={16} className="text-gold flex-shrink-0" />
              <span className="text-sm text-text-primary">{folder.name}</span>
              <span className="ml-auto text-xs text-text-muted">{folder.items.length}</span>
            </button>
          ))}
        </div>

        {/* Create new */}
        {creating ? (
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Folder name..."
              className="flex-1 bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50"
            />
            <button onClick={handleCreate} className="px-3 py-2 bg-gold text-bg-primary text-sm rounded-lg font-medium hover:bg-gold-light transition">Add</button>
          </div>
        ) : null}

        {/* Footer */}
        <div className="flex border-t border-border">
          <button
            onClick={() => setCreating(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-gold hover:bg-bg-hover transition"
          >
            <Plus size={14} />
            Create
          </button>
          <div className="w-px bg-border" />
          <button
            onClick={handleDone}
            className="flex-1 py-3 text-sm font-medium text-text-primary hover:bg-bg-hover transition"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
