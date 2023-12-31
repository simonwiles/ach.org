const Image = require("@11ty/eleventy-img");

const image = async (src, name) => {
  const image = src
    ? `./src/images/officers/${src}`
    : "./src/images/no-avatar.jpg";

  let metadata = await Image(image, {
    formats: ["avif", "webp", "jpeg"],
    widths: [100],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    alt: src ? `${name} headshot` : "Generic avatar",
    sizes: "(min-width: 100px) 100px, 100vw",
    loading: "lazy",
    decoding: "async",
    class: "officer-image",
    height: "100",
  };
  return Image.generateHTML(metadata, imageAttributes);
};

const faGlobe = `
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" class="icon" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
  </svg>
`;

const faEnvelope = `
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
  </svg>
`;

const renderWebsite = (website) =>
  `<a href="${website}" target="_blank" rel="noreferrer" title="Website">${faGlobe}</a>`;

const renderEmail = (email) =>
  `<a href="mailto:${email}" title="Email">${faEnvelope}</a>`;

module.exports = async ({
  name,
  imageSrc,
  position,
  affiliation,
  website,
  email,
}) => {
  return `
    <article class="officer-single">
      ${await image(imageSrc, name)}
      <h3 class="officer-name">${name}</h3>
        <div class="officer-content">
          ${position ? '<p class="officer-subtitle">' + position + "</p>" : ""}
          ${
            affiliation
              ? '<p class="officer-description">' + affiliation + "</p>"
              : ""
          }
        </div>
        <div class="officer-socials">
          ${website ? renderWebsite(website) : ""}
          ${email ? renderEmail(email) : ""}
        </div>
    </article>
  `;
};
