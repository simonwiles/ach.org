const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./static/": "/" });
  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });

  eleventyConfig.addCollection("news", (collectionApi) =>
    collectionApi.getFilteredByGlob("pages/news/**/*.md"),
  );

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    templateFormats: ["11ty.js", "md"],
    markdownTemplateEngine: false,

    dir: {
      input: "pages",
      includes: "../src",
      output: "_site",
    },

    pathPrefix: "/",
  };
};
