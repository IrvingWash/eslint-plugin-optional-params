import * as esbuild from 'esbuild'

await esbuild.build({
	entryPoints: ['./src/index.ts'],
	bundle: true,
	minify: true,
	platform: 'node',
	target: ['node16.0'],
	outfile: './dist/index.js',
});
