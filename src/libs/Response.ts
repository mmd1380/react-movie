export enum RequestMethod {
	POST,
	GET,
	DELETE,
  PATCH
}

enum ErrorType {}

export interface ResponseProps {
	success?: boolean;
	data?: any;
	message?: string;
	apiName: string;
	requestMethod?: RequestMethod | string;
	errorType?: ErrorType;
	statusCode?: number;
}

export default class Response {
	success: boolean;
	data?: any;
	message?: string;
	apiName: string;
	requestMethod?: RequestMethod | string;
	errorType?: ErrorType;
	constructor({ data, message, apiName, requestMethod, errorType, statusCode }: ResponseProps) {
		this.success = statusCode === 200;
		this.data = data || null;
		this.message = message || "";
		this.requestMethod = requestMethod;
		this.apiName = apiName;
		this.errorType = errorType;
	}
}
