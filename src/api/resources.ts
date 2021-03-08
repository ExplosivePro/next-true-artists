import { api } from "./axios";

// Working styles, used in register selection
export const getWorkingStyleList = async () => {
  try {
    const result = await api.get("/api/v1/styles");
    return result.data;
  } catch (e) {
    return [];
  }
};

// Artist public list
export const getArtistList = async (page: number) => {
  try {
    const result = await api.get(`/api/v1/artists?page=${page}`);
    return result.data;
  } catch (e) {
    return {
      artists: [],
      meta: {},
    };
  }
};

// Get all artist list, this is used for SSR preload data purpose
export const getAllArtistList = async (): Promise<Resource.ArtistDetail[]> => {
  try {
    // TODO: Call API here
    // const result = await api.get(`/api/v1/artists`);
    return [{ id: 1 }, { id: 2 }];
  } catch (e) {
    return [];
  }
};

export const getArtistById = async (id: number): Promise<Resource.ArtistDetail> => {
  try {
    // TODO: Call API here
    // const result = await api.get(`/api/v1/artists`);
    return {
      id: id,
      first_name: "Minh",
      last_name: "Hoang",
      street_address: "260/10 Lac Long Quan Street",
      city: "Ho Chi Minh City",
      styles: [
        {
          id: 1,
          name: "Old School",
        },
        {
          id: 2,
          name: "Black & Grey",
        },
        {
          id: 3,
          name: "Blackwork",
        },
      ],
      tattoos: [
        {
          src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
          thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 174,
        },
        {
          src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
          thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 183,
        },
        {
          src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
          thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
          thumbnailWidth: 271,
          thumbnailHeight: 320,
        },
        {
          src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
          thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
          thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
          thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
          thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
          thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
          thumbnailWidth: 257,
          thumbnailHeight: 320,
        },
        {
          src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
          thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 174,
        },
        {
          src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
          thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 183,
        },
        {
          src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
          thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
          thumbnailWidth: 271,
          thumbnailHeight: 320,
        },
        {
          src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
          thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
          thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
          thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
          thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
          thumbnailWidth: 320,
          thumbnailHeight: 213,
        },
        {
          src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
          thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
          thumbnailWidth: 257,
          thumbnailHeight: 320,
        },
      ],
      avatar: "/images/tatooer.png",
    };
  } catch (e) {
    return {
      id: id,
      first_name: "Minh",
      last_name: "Hoang",
      street_address: "260/10 Lac Long Quan Street",
      city: "Ho Chi Minh City",
      styles: [
        {
          id: 1,
          name: "Black",
        },
      ],
      tattoos: [],
      avatar: "/images/tatooer.png",
    };
  }
};

// Studio public list
export const getStudioList = async (page: number) => {
  try {
    const result = await api.get(`/api/v1/studios?page=${page}`);
    return result.data;
  } catch (e) {
    return {
      artists: [],
      meta: {},
    };
  }
};
