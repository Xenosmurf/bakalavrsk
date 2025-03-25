import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "dyplomnaapp2.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7114';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false
            },
            '^/register': {
                target,
                secure: false
            },
            '^/login': {
                target,
                secure: false
            },
            '^/pingauth': {
                target,
                secure: false
            },
            '^/logout': {
                target,
                secure: false
            },
            '^/profiles': {
                target,
                secure: false
            },
            '^/blobs': {
                target,
                secure: false
            },
            '^/adserver': {
                target,
                secure: false
            },
            '^/price': {
                target,
                secure: false
            },
            '^/reviewEmplo': {
                target,
                secure: false
            },
             '^/reviewExp': {
                target,
                secure: false
            },
             '^/categories': {
                target,
                secure: false
            },
            '^/portfolio': {
                target,
                secure: false
            },
            '^/postcards': {
                target,
                secure: false
            },
            '^/image': {
                target,
                secure: false
            },
            '^/addphotos': {
                target,
                secure: false
            },
            '^/categoryprofile': {
                target,
                secure: false
            },
            '^/request': {
                target,
                secure: false
            },
            '^/relations': {
                target,
                secure: false
            },

        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
