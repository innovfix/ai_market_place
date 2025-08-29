"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MoreHorizontal, Lock } from "lucide-react";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { CreateListModal } from "@/components/lists/CreateListModal";

interface List {
  id: string;
  name: string;
  description?: string;
  gigs: number;
  sellers: number;
  inspiration: number;
  isPrivate?: boolean;
}

export default function MyListsPage() {
  const [lists, setLists] = useState<List[]>([
    {
      id: "1",
      name: "My first list",
      gigs: 0,
      sellers: 0,
      inspiration: 0,
      isPrivate: true
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateList = (listData: { name: string; description: string }) => {
    const newList: List = {
      id: Date.now().toString(),
      name: listData.name,
      description: listData.description,
      gigs: 0,
      sellers: 0,
      inspiration: 0,
      isPrivate: false
    };
    setLists([...lists, newList]);
  };

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My lists</h1>
            <p className="text-gray-400 max-w-lg">
              Organize your go-to freelancers and favorite services into custom lists you can easily access and share with your team.
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create a List
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lists.map((list) => (
            <Card key={list.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
              <CardContent className="p-0">
                {/* Empty state placeholder */}
                <div className="aspect-[4/3] bg-gray-800 border-b border-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-2 w-16 h-12">
                      <div className="bg-gray-700 rounded"></div>
                      <div className="bg-gray-700 rounded"></div>
                      <div className="bg-gray-600 rounded"></div>
                      <div className="bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium text-lg">{list.name}</h3>
                    <div className="flex items-center gap-2">
                      {list.isPrivate && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                      <button className="p-1 hover:bg-gray-700 rounded cursor-pointer">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>Gigs ({list.gigs}) • Sellers ({list.sellers}) • Inspiration ({list.inspiration})</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create new list card */}
          <Card 
            className="bg-gray-900 border-gray-700 border-dashed hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <CardContent className="p-0">
              <div className="aspect-[4/3] border-b border-gray-700 border-dashed flex items-center justify-center">
                <Plus className="h-8 w-8 text-gray-500" />
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-gray-400 font-medium">Create a new list</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {lists.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-white text-lg font-medium mb-2">No lists yet</h3>
              <p className="text-gray-400 mb-4">Create your first list to organize your favorite services and sellers.</p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create your first list
              </Button>
            </div>
          </div>
        )}

        {/* Create List Modal */}
        <CreateListModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateList={handleCreateList}
        />
      </div>
    </div>
  );
}
