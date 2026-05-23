import { useEffect } from "react";

const SITE_NAME = "NILESH.SYS";
const BASE_URL = "https://portfolio-nileshcfs-projects.vercel.app";

function setMeta(selector, attr, value) {
  let el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function useSeoMeta({ title, description, path = "" }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} // Cloud Specialist / Solutions Architect`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('link[rel="canonical"]', "href", url);
  }, [title, description, path]);
}
