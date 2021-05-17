import StorefrontIcon from "@material-ui/icons/Storefront";
import LinkIcon from "@material-ui/icons/Link";
import CategoryIcon from "@material-ui/icons/Category";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";

import { Role } from "./auth";

export const attributes = [
  {
    title: "Add your profile image",
    subTitle: "Add a profile image",
    icon: <StorefrontIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_avatar",
  },
  {
    title: "Add your social media profiles",
    subTitle: "Add FB, IG, or your website",
    icon: <LinkIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_social_profiles",
  },
  {
    title: "Add tattoo styles",
    subTitle: "Add styles you specialize in",
    icon: <CategoryIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST],
    mappingKey: "has_styles",
  },
  {
    title: "Upload atleast 5 tattoo images",
    subTitle: "Upload samples of your work",
    icon: <PhotoAlbumIcon />,
    url: "/dashboard/upload-tattoos",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
    mappingKey: "has_tattoo_gallery",
  },
];
