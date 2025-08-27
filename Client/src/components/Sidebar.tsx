import { toggleDrawer } from "@/redux/slices/settingSlice";
import { RootState } from "@/redux/store";
import {
  HomeOutlined,
  Hub,
  Lock,
  Message,
  People,
  Translate,
} from "@mui/icons-material";
import { Drawer, List, ListSubheader, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo_nexo from "../../src/assets/images/logo_nexo (2).png";
import { useDetectLayout } from "@/hooks";

const ListStyled = styled(List)`
  padding: 16px;
  border-radius: 4px
  gap: 4px ;
`;

const SidebarContent: React.FC = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <ListStyled className="flex flex-col gap-2 bg-white !px-4 !py-3 shadow">
        <Link to="/" className="item-center flex gap-1">
          <HomeOutlined fontSize="small" /> New Feeds
        </Link>
        <Link to="/messenger" className="item-center flex gap-1">
          <Message fontSize="small" /> Messenger
        </Link>
        <Link to="/friends" className="item-center flex gap-1">
          <People fontSize="small" />
          Friends
        </Link>
        <Link to="/groups" className="item-center flex gap-1">
          <Hub fontSize="small" />
          Groups
        </Link>
      </ListStyled>

      <ListStyled className="flex flex-col gap-2 bg-white !px-4 !py-1 shadow">
        <ListSubheader className="mb-2 !px-0 !leading-none">
          Settings
        </ListSubheader>
        <Link to="/settings/account" className="item-center flex gap-1">
          <Lock fontSize="small" />
          Account
        </Link>
        <Link to="/settings/languages" className="item-center flex gap-1">
          <Translate fontSize="small" />
          Languages
        </Link>
      </ListStyled>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { isMinimizeLayout } = useDetectLayout();
  const isshowDrawer = useSelector(
    (store: RootState) => store.setting.isshowDrawer,
  );
  const dispatch = useDispatch();

  return isMinimizeLayout ? (
    <Drawer
      open={isshowDrawer}
      onClose={() => dispatch(toggleDrawer())}
      classes={{ paper: "p-4 flex flex-col gap-4 bg-dark-200" }}
    >
      <div>
        <Link to="/">
          <img src={logo_nexo} alt="Nexo Logo" className="h-12 w-12" />
        </Link>
      </div>
      <SidebarContent />
    </Drawer>
  ) : (
    <SidebarContent />
  );
};

export default Sidebar;
