import { getUserProfile, updateUserName } from "@/api/user";
import { Avatar, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface UserType {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

interface GetUserResponse {
  user: UserType;
}

const AccountSettingPage: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState<UserType | null>(null);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const res = await getUserProfile(userId);
        console.log("res", res);
        setUser((res.data as GetUserResponse).user);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!userId) {
        alert("❌ Missing user. Please log in again.");
        return;
      }
      const res = await updateUserName(userId, newName);
      setUser((res.data as GetUserResponse).user);
      alert("✅ Updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user!");
    } finally {
      setSaving(false);
    }
    setEdit(!edit);
  };

  return (
    <div className="mx-auto h-screen lg:w-3/4">
      <div className="gap-4 bg-background-main p-6">
        <p className="text-2xl font-bold">Account Setting</p>
        <p className="rounded-t border-b bg-white p-4 shadow">
          Profile Details
        </p>
        <div className="rounded-b border-b bg-white p-4">
          <div className="flex items-center gap-5">
            <Avatar sizes="large" />
            <Button variant="contained">Upload new photo</Button>
          </div>
          <div className="mt-5">
            <span>Full Name</span>
            <TextField
              value={newName || user?.fullName}
              onChange={(e) => setNewName(e.target.value)}
              fullWidth
              size="small"
              disabled={!edit} // ❌ ban đầu disabled, khi edit = true thì bật
            />
          </div>
          <div className="mt-5 flex gap-4">
            {edit ? (
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setEdit(true)}>
                Edit
              </Button>
            )}
            <Button className="!bg-[#A8AAAE29] !text-slate-300">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
