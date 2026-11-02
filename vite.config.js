

import { enhancedImages } from "@sveltejs/enhanced-img";
import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-bun";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    tailwindcss(),
    sveltekit({
      adapter: adapter({
        buildOptions: {
          compile: {
            aot: true
          }
        }
      }),
      compilerOptions: {
        experimental: {
          async: true
        }
      },
      experimental: {
        remoteFunctions: true
      }
    })
  ]
});

