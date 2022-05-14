import apiModule, { onResponse, onError } from ".";
import { image_base_url } from "../config/axios";

const baseUrl = image_base_url;

export const fetchImages = async (path: string, fileSize: string="original") => {
  
  const apiName = "FETCH_IMAGES";
  try {
    const items = await apiModule.get(`${baseUrl}/${fileSize}${path}`, { responseType: "arraybuffer" });
    return await onResponse(items, apiName)
  } catch(err) {
    return onError(err, apiName);
  }
} 