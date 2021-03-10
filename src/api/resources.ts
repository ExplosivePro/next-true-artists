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
export const getStudioList = async (page: number): Promise<Resource.StudioListResponse> => {
  try {
    const result = await api.get(`/api/v1/studios?page=${page}`);
    return result.data;
    // return {
    //   meta: {
    //     current_page: page,
    //     last_page: page === 3,
    //     limit_value: 60,
    //     next_page: page + 1,
    //     total_count: 10,
    //     total_pages: 3,
    //   },
    //   studios: [
    //     {
    //       id: page,
    //       name: `Mango-${page}`,
    //       city: "Barcelona",
    //       country: "Catalunya",
    //       rating: 5,
    //       totalRating: 2314,
    //       avatar: "/images/tatooer.png",
    //       images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
    //     },
    //     {
    //       id: page + 1,
    //       name: `Mango-${page + 1}`,
    //       city: "Barcelona",
    //       country: "Catalunya",
    //       rating: 5,
    //       totalRating: 2314,
    //       avatar: "/images/tatooer.png",
    //       images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
    //     },
    //   ],
    // };
  } catch (e) {
    return {
      studios: [],
      meta: {
        current_page: 1,
        last_page: true,
        limit_value: 60,
        next_page: 1,
        total_count: 0,
        total_pages: 1,
      },
    };
  }
};

// Featured studio list
export const getFeaturedStudioList = async (page: number) => {
  try {
    const result = await api.get(`/api/v1/studios?page=${page}`);
    return result.data;
    // return {
    //   meta: {
    //     current_page: page,
    //     last_page: page === 3,
    //     limit_value: 60,
    //     next_page: page + 1,
    //     total_count: 10,
    //     total_pages: 3,
    //   },
    //   studios: [
    //     {
    //       id: page,
    //       name: `Mango-${page}`,
    //       city: "Barcelona",
    //       country: "Catalunya",
    //       rating: 5,
    //       totalRating: 2314,
    //       avatar: "/images/tatooer.png",
    //       images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
    //     },
    //     {
    //       id: page + 1,
    //       name: `Mango-${page + 1}`,
    //       city: "Barcelona",
    //       country: "Catalunya",
    //       rating: 5,
    //       totalRating: 2314,
    //       avatar: "/images/tatooer.png",
    //       images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
    //     },
    //     {
    //       id: page + 2,
    //       name: `Mango-${page + 2}`,
    //       city: "Barcelona",
    //       country: "Catalunya",
    //       rating: 5,
    //       totalRating: 2314,
    //       avatar: "/images/tatooer.png",
    //       images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
    //     },
    //   ],
    // };
  } catch (e) {
    return {
      studios: [],
      meta: {},
    };
  }
};

// Get studio by id
export const getStudioById = async (id: number): Promise<Resource.StudioDetail> => {
  try {
    // TODO: Call API here
    // const result = await api.get(`/api/v1/artists`);
    return {
      id: id,
      name: `Mango-${id}`,
      city: "Barcelona",
      country: "Catalunya",
      rating: 5,
      bio:
        "Barcelona's finest custom tattoos, next to the famous Sagrada Familia. You can find from small minimalist tattoos to big elaborate full body designs. WALK INS WELCOME",
      totalRating: 2314,
      avatar: "/images/tatooer.png",
      tattoos: [
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
      ],
      street_address: "Carrer de Còrsega, 527, 08025",
      cover: "/images/fullwidth-cover.png",
      lat: 25.7823907,
      long: -80.2994989,
    };
  } catch (e) {
    return {
      id: id,
      name: `Mango-${id}`,
      city: "Barcelona",
      country: "Catalunya",
      rating: 5,
      bio:
        "Barcelona's finest custom tattoos, next to the famous Sagrada Familia. You can find from small minimalist tattoos to big elaborate full body designs. WALK INS WELCOME",
      totalRating: 2314,
      avatar: "/images/tatooer.png",
      images: ["/images/feature-studio.jpg", "/images/feature-studio.jpg", "/images/feature-studio.jpg"],
      street_address: "Carrer de Còrsega, 527, 08025",
      cover: "/images/fullwidth-cover.png",
    };
  }
};

// Top city list
export const getTopCityList = async () => {
  try {
    // TODO: Call API here
    return [
      {
        name: "Seoul",
        image: "/images/seoul.jpg",
      },
      {
        name: "Bangkok",
        image: "/images/bangkok.jpg",
      },
      {
        name: "Perth",
        image: "/images/perth.jpg",
      },
      {
        name: "Singapore",
        image: "/images/singapore.jpg",
      },
      {
        name: "Bejing",
        image: "/images/bejing.jpg",
      },
      {
        name: "Tokyo",
        image: "/images/tokyo.jpg",
      },
      {
        name: "Seoul",
        image: "/images/seoul.jpg",
      },
    ];
  } catch (e) {
    return [];
  }
};
