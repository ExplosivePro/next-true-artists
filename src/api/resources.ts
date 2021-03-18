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
  const result = await api.get(`/api/v1/artists/${id}`);
  return result.data;
};

// Studio public list
export const getStudioList = async (page: number): Promise<Resource.StudioListResponse> => {
  try {
    const result = await api.get(`/api/v1/studios?page=${page}`);
    return result.data;
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
  } catch (e) {
    return {
      studios: [],
      meta: {},
    };
  }
};

// Get studio by id
export const getStudioById = async (id: number): Promise<Resource.StudioDetail> => {
  const result = await api.get(`/api/v1/studios/${id}`);
  return result.data;
};

// Get studio by id
export const getStudioReviews = async (id: number): Promise<Resource.Review[]> => {
  // TODO: Call APIs here
  return [
    {
      name: "Alena Levin",
      avatar: { id: id, name: "", image_url: "/images/sample-girl-avatar.svg" },
      rate: 5,
      comment:
        "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
    },
    {
      name: "Minh Hoang",
      avatar: { id: id, name: "", image_url: "/images/sample-girl-avatar.svg" },
      rate: 3,
      comment:
        "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
    },
    {
      name: "Bad Guy",
      avatar: { id: id, name: "", image_url: "/images/sample-girl-avatar.svg" },
      rate: 4,
      comment:
        "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
    },
  ];
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

// Tattoo public list
export const getTattooList = async (page: number, searchKey?: string): Promise<Resource.TattooListResponse> => {
  try {
    console.log(searchKey);
    // const result = await api.get(`/api/v1/studios?page=${page}`);
    // return result.data;
    return {
      tattoos: [
        {
          id: page,
          image: {
            id: 1,
            image_url: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            name: "image1",
          },
        },
        {
          id: page + 1,
          image: {
            id: 2,
            image_url: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
            name: "image2",
          },
        },
      ],
      meta: {
        current_page: 1,
        last_page: true,
        limit_value: 60,
        next_page: 1,
        total_count: 0,
        total_pages: 1,
      },
    };
  } catch (e) {
    return {
      tattoos: [],
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
