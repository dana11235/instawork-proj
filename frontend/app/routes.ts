import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/list.tsx"),
    route("users/new", "routes/new.tsx"),
    route("users/:userId", "routes/edit.tsx")
] satisfies RouteConfig;
