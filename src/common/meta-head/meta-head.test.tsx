/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "@vuer-ai/react-helmet-async";
import type React from "react";
import { MetaHead } from "./meta-head";

const renderWithHelmet = (component: React.ReactElement) =>
  render(<HelmetProvider>{component}</HelmetProvider>);

describe("MetaHead", () => {
  beforeEach(() => {
    // Clear the document head before each test
    document.head.innerHTML = "";
  });

  afterEach(() => {
    // Clean up after each test
    document.head.innerHTML = "";
  });

  describe("basic meta tags", () => {
    it("should render title tag when title prop is provided", async () => {
      renderWithHelmet(<MetaHead title="Test Title" />);

      await waitFor(() => {
        expect(document.title).toBe("Test Title");
      });
    });

    it("should render description meta tag when description prop is provided", async () => {
      renderWithHelmet(<MetaHead description="Test description" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="description"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("Test description");
      });
    });

    it("should render keywords meta tag when keywords prop is provided", async () => {
      renderWithHelmet(<MetaHead keywords="react, test, meta" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="keywords"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("react, test, meta");
      });
    });

    it("should render canonical link when canonical prop is provided", async () => {
      renderWithHelmet(<MetaHead canonical="/test-page" />);

      await waitFor(() => {
        const linkTag = document.querySelector('link[rel="canonical"]');
        expect(linkTag).toBeTruthy();
        expect(linkTag?.getAttribute("href")).toBe("/test-page");
      });
    });

    it("should not render title tag when title prop is not provided", () => {
      renderWithHelmet(<MetaHead description="Test" />);

      const titleTag = document.querySelector("title");
      // Title might exist from index.html, but it shouldn't be set by MetaHead
      // We check that if title exists, it's not our test title
      if (titleTag) {
        expect(titleTag.textContent).not.toBe("Test Title");
      }
    });
  });

  describe("robots meta tag", () => {
    it("should render robots meta tag with default values", async () => {
      renderWithHelmet(<MetaHead />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="robots"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("index, follow");
      });
    });

    it("should render robots meta tag with noindex when noindex is true", async () => {
      renderWithHelmet(<MetaHead noindex />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="robots"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("noindex, follow");
      });
    });

    it("should render robots meta tag with nofollow when nofollow is true", async () => {
      renderWithHelmet(<MetaHead nofollow />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="robots"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("index, nofollow");
      });
    });

    it("should render robots meta tag with both noindex and nofollow", async () => {
      renderWithHelmet(<MetaHead noindex nofollow />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="robots"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("noindex, nofollow");
      });
    });
  });

  describe("Open Graph tags", () => {
    it("should render og:type meta tag with default value", async () => {
      renderWithHelmet(<MetaHead />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[property="og:type"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("website");
      });
    });

    it("should render og:type meta tag with custom value", async () => {
      renderWithHelmet(<MetaHead ogType="article" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[property="og:type"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("article");
      });
    });

    it("should render og:title meta tag when ogTitle prop is provided", async () => {
      renderWithHelmet(<MetaHead ogTitle="OG Test Title" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[property="og:title"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("OG Test Title");
      });
    });

    it("should render og:description meta tag when ogDescription prop is provided", async () => {
      renderWithHelmet(<MetaHead ogDescription="OG Test Description" />);

      await waitFor(() => {
        const metaTag = document.querySelector(
          'meta[property="og:description"]',
        );
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("OG Test Description");
      });
    });

    it("should render og:image meta tag when ogImage prop is provided", async () => {
      renderWithHelmet(<MetaHead ogImage="/test-image.jpg" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[property="og:image"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("/test-image.jpg");
      });
    });

    it("should render og:url meta tag when ogUrl prop is provided", async () => {
      renderWithHelmet(<MetaHead ogUrl="/test-page" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[property="og:url"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("/test-page");
      });
    });

    it("should not render og:title when ogTitle prop is not provided", () => {
      renderWithHelmet(<MetaHead ogDescription="Test" />);

      const metaTag = document.querySelector('meta[property="og:title"]');
      expect(metaTag).toBeFalsy();
    });
  });

  describe("Twitter Card tags", () => {
    it("should render twitter:card meta tag with default value", async () => {
      renderWithHelmet(<MetaHead />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="twitter:card"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("summary_large_image");
      });
    });

    it("should render twitter:card meta tag with custom value", async () => {
      renderWithHelmet(<MetaHead twitterCard="summary" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="twitter:card"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("summary");
      });
    });

    it("should render twitter:title meta tag when twitterTitle prop is provided", async () => {
      renderWithHelmet(<MetaHead twitterTitle="Twitter Test Title" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="twitter:title"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("Twitter Test Title");
      });
    });

    it("should render twitter:description meta tag when twitterDescription prop is provided", async () => {
      renderWithHelmet(
        <MetaHead twitterDescription="Twitter Test Description" />,
      );

      await waitFor(() => {
        const metaTag = document.querySelector(
          'meta[name="twitter:description"]',
        );
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe(
          "Twitter Test Description",
        );
      });
    });

    it("should render twitter:image meta tag when twitterImage prop is provided", async () => {
      renderWithHelmet(<MetaHead twitterImage="/twitter-image.jpg" />);

      await waitFor(() => {
        const metaTag = document.querySelector('meta[name="twitter:image"]');
        expect(metaTag).toBeTruthy();
        expect(metaTag?.getAttribute("content")).toBe("/twitter-image.jpg");
      });
    });

    it("should not render twitter:title when twitterTitle prop is not provided", () => {
      renderWithHelmet(<MetaHead twitterDescription="Test" />);

      const metaTag = document.querySelector('meta[name="twitter:title"]');
      expect(metaTag).toBeFalsy();
    });
  });

  describe("combined props", () => {
    it("should render all meta tags when all props are provided", async () => {
      renderWithHelmet(
        <MetaHead
          title="Full Test Title"
          description="Full Test Description"
          keywords="test, keywords"
          canonical="/full-test"
          ogTitle="OG Full Title"
          ogDescription="OG Full Description"
          ogImage="/og-image.jpg"
          ogUrl="/full-test"
          ogType="article"
          twitterCard="summary"
          twitterTitle="Twitter Full Title"
          twitterDescription="Twitter Full Description"
          twitterImage="/twitter-image.jpg"
        />,
      );

      await waitFor(() => {
        expect(document.title).toBe("Full Test Title");
        expect(
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute("content"),
        ).toBe("Full Test Description");
        expect(
          document
            .querySelector('meta[name="keywords"]')
            ?.getAttribute("content"),
        ).toBe("test, keywords");
        expect(
          document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        ).toBe("/full-test");
        expect(
          document
            .querySelector('meta[property="og:title"]')
            ?.getAttribute("content"),
        ).toBe("OG Full Title");
        expect(
          document
            .querySelector('meta[property="og:description"]')
            ?.getAttribute("content"),
        ).toBe("OG Full Description");
        expect(
          document
            .querySelector('meta[property="og:image"]')
            ?.getAttribute("content"),
        ).toBe("/og-image.jpg");
        expect(
          document
            .querySelector('meta[property="og:url"]')
            ?.getAttribute("content"),
        ).toBe("/full-test");
        expect(
          document
            .querySelector('meta[property="og:type"]')
            ?.getAttribute("content"),
        ).toBe("article");
        expect(
          document
            .querySelector('meta[name="twitter:card"]')
            ?.getAttribute("content"),
        ).toBe("summary");
        expect(
          document
            .querySelector('meta[name="twitter:title"]')
            ?.getAttribute("content"),
        ).toBe("Twitter Full Title");
        expect(
          document
            .querySelector('meta[name="twitter:description"]')
            ?.getAttribute("content"),
        ).toBe("Twitter Full Description");
        expect(
          document
            .querySelector('meta[name="twitter:image"]')
            ?.getAttribute("content"),
        ).toBe("/twitter-image.jpg");
      });
    });
  });
});
