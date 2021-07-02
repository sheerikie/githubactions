import { createWebHistory, createRouter } from "vue-router";


const routes = [

    {
        path: "/",
        alias: "/landing",
        name: "landing",
        component: () => import("./components/HelloWorld")
    },
    {
        path: "/tutorials",
        alias: "/tutorials",
        name: "tutorials",
        component: () => import("./components/TutorialsList")
    },
    {
        path: "/tutorials/:id",
        name: "tutorial-details",
        component: () => import("./components/Tutorial")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddTutorial")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("./components/Home")
    },

    {
        path: "/login",
        name: "login",
        component: () => import("./components/Login"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("./components/Register")
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: () => import("./components/Profile"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("./components/BoardAdmin"),
    },
    {
        path: "/mod",
        name: "moderator",
        component: () => import("./components/BoardModerator"),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("./components/BoardUser"),
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("./components/ForgotPassword"),
    },
    {
        path: "/passwordReset",
        name: "passwordReset",
        component: () => import("./components/PasswordReset"),
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;