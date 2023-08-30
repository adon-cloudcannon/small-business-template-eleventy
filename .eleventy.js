const pluginBookshop = require("@bookshop/eleventy-bookshop");
const yaml = require("js-yaml");



module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/styles");

    // Data extensions
    eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))
	eleventyConfig.addDataExtension('yml', contents => yaml.load(contents))

    // Bookshop
    eleventyConfig.addWatchTarget("component-library/");

    eleventyConfig.addPlugin(pluginBookshop({
		bookshopLocations: ["component-library"],
		pathPrefix: '',
	}));



    // Filters


    return {
        dir: {
            input: "src",
            output: "_site"
        }
    }
}