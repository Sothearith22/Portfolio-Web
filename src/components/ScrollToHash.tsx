import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SECTION_PATHS = new Set(["/about", "/skills", "/projects", "/experience", "/contact"]);

export const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const targetId = hash.replace("#", "") || (SECTION_PATHS.has(pathname) ? pathname.slice(1) : "");

    const scroll = () => {
      if (!targetId) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
};
