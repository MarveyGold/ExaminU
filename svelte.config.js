import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    experimental: { remoteFunctions: true },
    adapter: adapter({
      out: 'build',
      precompress: {
        brotli: true,
        gzip: true,
        files: ['htm', 'html', 'js', 'css', 'svg']
      }
    })
  },
  compilerOptions: {
    experimental: { async: true }
  }
};

export default config;
