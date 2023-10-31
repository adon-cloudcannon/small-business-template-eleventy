const pluginBookshop = require("@bookshop/eleventy-bookshop");
const yaml = require("js-yaml");
const svgContents = require("eleventy-plugin-svg-contents")
const esbuild = require('esbuild');
const { Tokenizer, assert } = require('liquidjs');

const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt({
    html: true,
  });


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/styles");
    eleventyConfig.addPassthroughCopy("css");

    // Data extensions
    eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))
    eleventyConfig.addDataExtension('yml', contents => yaml.load(contents))
    // Bookshop
    eleventyConfig.addWatchTarget("component-library/");

    eleventyConfig.addPlugin(pluginBookshop({
      bookshopLocations: ["component-library"],
      pathPrefix: '',
    }));

    // Plugins
    eleventyConfig.addPlugin(svgContents);

    // Filters
    eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));

    eleventyConfig.addFilter('contains_block', function(content_blocks, blockName) {
      if (!Array.isArray(content_blocks)) {
        return false;
      }
      return content_blocks.some(block => block._bookshop_name === blockName);
    });

    // Tags
    eleventyConfig.addLiquidTag('assign_local', function(liquidEngine) {
      return {
        parse: function (token) {
            const tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
            this.key = tokenizer.readIdentifier().content;
            tokenizer.skipBlank();
            assert(tokenizer.peek() === '=', () => `illegal token ${token.getText()}`);
            tokenizer.advance();
            this.value = tokenizer.remaining();
        },
        render: function(ctx) {
            ctx.scopes[ctx.scopes.length-1][this.key] = this.liquid.evalValueSync(this.value, ctx);
        }
      }
  });

    eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
    });

    // esbuild
    eleventyConfig.addWatchTarget('./src/assets/js/**');
    eleventyConfig.on('eleventy.before', async () => {
      await esbuild.build({
        entryPoints: ['src/assets/js/**'],
        outdir: '_site/assets/js',
        bundle: true,
        minify: true,
        sourcemap: true,
      });
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    }
}