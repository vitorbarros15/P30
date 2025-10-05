declare const _default: (() => {
    port: number;
    nodeEnv: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
}>;
export default _default;
