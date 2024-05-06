"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Item } from "./item";
import { Spinner } from "../ui/spinner";

import { CiImport } from "react-icons/ci";
import { PiPlusThin } from "react-icons/pi";
import { BsFillTrash2Fill } from "react-icons/bs";
import { HiOutlineTemplate } from "react-icons/hi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { GoPeople, GoPlusCircle, GoStar } from "react-icons/go";
import { UserMenu } from "./usermenu";

export const SideBarItems = () => {
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col gap-3">
      <div className="w-[90%]">
        <UserMenu />
      </div>
      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <Item label="Search" Icon={IoSearch} />
        <Item label="Settings" Icon={IoSettingsOutline} />
        <Item label="Favorites" Icon={GoStar} />
        <Item label="New Page" Icon={GoPlusCircle} onClick={() => {}} />
      </div>

      {/* <div className="mt-2">
        {documents?.length! <= 0 ? (
          <p className="ml-4 text-xs text-muted-foreground">No documents</p>
        ) : (
          <DocumentList documents={documents} />
        )}
      </div>

      {documents?.length! > 0 && (
        <div className="mb-2">
          <Item label="New Page" Icon={PiPlusThin} onClick={handleCreatePage} />
        </div>
      )} */}

      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <Item label="Create a Teamspace" Icon={GoPeople} />
        <Item label="Template" Icon={HiOutlineTemplate} />
        <Item label="Import" Icon={CiImport} />
        <Item label="Trash" Icon={BsFillTrash2Fill} />
      </div>
    </div>
  );
};
