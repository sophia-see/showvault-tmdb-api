import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === 'development'
        ? process.env.URL_LOCAL // Local URL for local development
        : process.env.URL_PRODUCTION, // Production URL for deployed app
})
