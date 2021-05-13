import StorefrontIcon from "@material-ui/icons/Storefront";
import LinkIcon from "@material-ui/icons/Link";
import CategoryIcon from "@material-ui/icons/Category";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";

import { Role } from "./auth";

export const attributes = [
  {
    title: "Add a Profile Image",
    subTitle: "Add a profile image",
    icon: <StorefrontIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_avatar",
  },
  {
    title: "Add Your Social Link",
    subTitle: "Add FB, IG, or website",
    icon: <LinkIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_social_profiles",
  },
  {
    title: "Add Your Styles",
    subTitle: "Add your styles",
    icon: <CategoryIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST],
    mappingKey: "has_styles",
  },
  {
    title: "Add Tattoo Gallery",
    subTitle: "Add your tattoos to gallery",
    icon: <PhotoAlbumIcon />,
    url: "/dashboard/upload-tattoos",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_tattoo_gallery",
  },
];
