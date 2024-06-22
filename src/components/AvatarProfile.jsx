import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link, useNavigate } from 'react-router-dom';


const AvatarProfile = ({ name, role, imageUrl, onLogout }) => {
  const initial = name ? name.charAt(0) : '?';

  return (
    <Menubar>
      <MenubarMenu >
        <MenubarTrigger>
          <div className="flex items-center justify-start space-x-4">
            <Avatar>
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={`${name}'s avatar`} />
              ) : (
                <AvatarFallback>{initial}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium uppercase">{name}</span>
              <span className="text-sm text-gray-500">{role}</span>
            </div>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          {role === "MEMBER" && (
            <>
              <Link to="/user">
                <MenubarItem>
                  Profil
                </MenubarItem>
              </Link>
              <MenubarItem onClick={onLogout}>
                Logout
              </MenubarItem>
            </>
          )}
          {role === "ADMIN" && (
            <>
              <Link to="/admin">
                <MenubarItem >
                  Dashboard
                </MenubarItem>
              </Link>
              <MenubarItem onClick={onLogout}>
                Logout
              </MenubarItem>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default AvatarProfile;
