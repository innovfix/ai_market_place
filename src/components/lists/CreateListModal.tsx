"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (listData: { name: string; description: string }) => void;
}

export function CreateListModal({ isOpen, onClose, onCreateList }: CreateListModalProps) {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      onCreateList({
        name: listName.trim(),
        description: description.trim()
      });
      setListName("");
      setDescription("");
      onClose();
    }
  };

  const handleCancel = () => {
    setListName("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black border border-gray-700 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Create a new list</h2>
          <button 
            onClick={handleCancel}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-gray-400 text-sm">
            Create a list around a project, a topic or for inspiration.
          </p>

          {/* List Name */}
          <div>
            <label htmlFor="listName" className="block text-sm font-medium text-white mb-2">
              List name
            </label>
            <div className="relative">
              <Input
                id="listName"
                type="text"
                placeholder='For example, "Marketing Designers"'
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                maxLength={60}
                className="w-full bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <span className="absolute right-3 top-3 text-xs text-gray-400">
                {listName.length}/60
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                placeholder='For example, "Great designers for our marketing campaigns"'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={330}
                rows={4}
                className="w-full bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md p-3 resize-none"
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                {description.length}/330
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!listName.trim()}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Create List
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
