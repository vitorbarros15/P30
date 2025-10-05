export declare class ErrorResponseDto {
    success: boolean;
    message: string;
    code: string;
    details?: any;
    timestamp: string;
    statusCode: number;
    path: string;
}
export declare class ValidationErrorResponseDto extends ErrorResponseDto {
    validationErrors?: Array<{
        field: string;
        message: string;
        value: any;
    }>;
}
