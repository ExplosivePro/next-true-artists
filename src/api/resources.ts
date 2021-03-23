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

// Get city list
export const getCityList = async (page: number) => {
  const result = await api.get(`/api/v1/locations?page=${page}`);
  return result.data;
};

// Tattoo public list
export const getTattooList = async (
  page: number,
  searchKey?: string,
  filters?: any,
): Promise<Resource.TattooListResponse> => {
  try {
    let query = `/api/v1/tattoos?page=${page}`;

    // IF search is defined
    if (searchKey) {
      query += `&query=${searchKey}`;
    }

    // IF filter is defined, and this is under object format
    if (filters && typeof filters === "object") {
      Object.keys(filters).map((filterKey) => {
        query += `&${filterKey}=${filters[filterKey].map((filter: any) => filter.name).join(",")}`;
      });
    }

    // IF filter is defined, and this is under string format
    if (filters && typeof filters === "object") {
      query += `&${filters}`;
    }

    const result = await api.get(query);
    return result.data;
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

// Get tattoo detail
export const getTattooById = async (id: number): Promise<Resource.TattooDetail> => {
  const result = await api.get(`/api/v1/tattoos/${id}`);
  return result.data;
};
