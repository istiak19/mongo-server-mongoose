import { Response } from "express";

interface IMeta {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
};

interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: IMeta
};

const sendResponse = <T>(res: Response, payload: IApiResponse<T>) => {
    const { statusCode, success, message, data, meta } = payload;
    res.status(statusCode).json({
        success,
        message,
        meta,
        data,
    });
};

export default sendResponse;