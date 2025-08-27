import React from "react";
import Sidebar from "@/components/Sidebar";
import PostCreation from "@/components/PostCreation";
import PostList from "@/components/PostList";
import FriendRequests from "@/components/FriendRequests";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="flex gap-4 bg-background-main p-6">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4">
          <PostCreation />
          <PostList />
        </div>
        <div className="hidden w-64 sm:block">
          <FriendRequests />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
