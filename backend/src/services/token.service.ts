import NodeCache from "node-cache";
import ms from "ms";

const jwtCache = new NodeCache();

const addTokenToBlockList = async (token: string, tokenExp: string) => {
    jwtCache.set(`at-${token}`, token, ms(tokenExp) / 1000);
};

const isTokenBlocked = async (token: string) => {
    const tokenKey = await jwtCache.get(`at-${token}`);

    if (tokenKey) {
        return true;
    }
    return false;
};

export const TokenService = {
    addTokenToBlockList,
    isTokenBlocked,
};
