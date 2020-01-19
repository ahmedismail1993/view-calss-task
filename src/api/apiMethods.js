import axiosInstance from "@/config";

export const IndexData = endPoint => {
  return axiosInstance({
    url: endPoint,
    method: "get"
  });
};

export const StoreData = (endPoint, data) => {
  return axiosInstance({
    url: endPoint,
    method: "post",
    data
  });
};
