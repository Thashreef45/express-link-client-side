/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GATEWAY_NODAL: string
    readonly VITE_GATEWAY_CP: string
    readonly VITE_GATEWAY_APEX: string
    readonly VITE_CLOUDINARY_IMAGE : string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}