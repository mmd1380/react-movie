import type { AxiosResponse } from "axios";
import axios from "axios";
import Response, { RequestMethod } from "../libs/Response";
import Logger from "../libs/Logger";
import { apiKey } from "../config/axios"

const reqMethods = ["request", "delete", "get", "head", "options", "post", "put", "patch"];

axios.defaults.params = {};
axios.defaults.params["api_key"] = apiKey;


const appClient: any = axios;

let apiModule: any = {};

reqMethods.forEach(method => {
	apiModule[method] = function (...args: any[]) {
		if (!appClient) {
			throw new Error("appClient not installed");
		}
		return appClient[method].apply(null, args);
	};
});

export default apiModule;

export const onResponse = (res: AxiosResponse<any>, apiName: string) => {
	return new Response({
    success: res.status > 200 && res.status < 300,
		data: res.data,
    requestMethod: res.config.method as undefined,
		message: res.statusText,
		errorType: res.data.errorType,
		statusCode: res.status,
		apiName,
	});
};

export const onError = (err: any, apiName: string) => {
	const response = err?.response?.data;
	Logger.log({
		fileName: "Test",
		type: "ERROR",
		log: err?.response?.data?.errorType || err,
	});
	return new Response({
		success: false,
		message: response?.message,
		errorType: response?.errorType,
		statusCode: response?.statusCode,
		apiName,
	});
};
