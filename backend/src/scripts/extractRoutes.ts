import { Router } from "express";

export const getRoutes = (
    router: Router,
    basePath: string = ""
): Array<{ method: string; path: string }> => {
    const routes: Array<{ method: string; path: string }> = [];

    router.stack.forEach((layer: any) => {
        if (layer.route) {
            const path = basePath + layer.route.path;
            layer.route.methods &&
                Object.keys(layer.route.methods).forEach((method) => {
                    if (layer.route.methods[method]) {
                        routes.push({ method: method.toUpperCase(), path });
                    }
                });
        } else if (layer.name === "router" && layer.handle.stack) {
            // Đây là một nested router
            const newBasePath =
                basePath +
                (layer.regexp.source
                    .replace("\\/?(?=\\/|$)", "")
                    .replace("\\", "")
                    .replace("^", "")
                    .replace("/i", "") || "");
            routes.push(...getRoutes(layer.handle, newBasePath));
        }
    });

    return routes;
};
