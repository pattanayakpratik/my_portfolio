"""
Unit tests validating Next.js App Router structure, routes, and critical components.
"""

import os
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC_DIR = os.path.join(ROOT_DIR, "src")
APP_DIR = os.path.join(SRC_DIR, "app")
COMPONENTS_DIR = os.path.join(SRC_DIR, "components")


class TestRoutingAndPages(unittest.TestCase):
    """Test suite ensuring all App Router routes and page components exist."""

    def test_app_router_core_routes(self):
        """Verify main landing page and dedicated showcase pages exist."""
        required_pages = [
            os.path.join(APP_DIR, "page.tsx"),
            os.path.join(APP_DIR, "layout.tsx"),
            os.path.join(APP_DIR, "not-found.tsx"),
            os.path.join(APP_DIR, "notes", "page.tsx"),
            os.path.join(APP_DIR, "projects", "cypher", "page.tsx"),
            os.path.join(APP_DIR, "projects", "pyshare", "page.tsx"),
        ]
        for page_file in required_pages:
            self.assertTrue(
                os.path.isfile(page_file),
                f"Required route file missing: {page_file}",
            )

    def test_seo_and_metadata_files(self):
        """Verify sitemap, robots, manifest, and OpenGraph images exist."""
        public_dir = os.path.join(ROOT_DIR, "public")
        self.assertTrue(os.path.isfile(os.path.join(public_dir, "sitemap.xml")))
        self.assertTrue(os.path.isfile(os.path.join(public_dir, "robots.txt")))
        self.assertTrue(os.path.isfile(os.path.join(public_dir, "manifest.webmanifest")))
        self.assertTrue(os.path.isfile(os.path.join(APP_DIR, "opengraph-image.tsx")))
        self.assertTrue(os.path.isfile(os.path.join(APP_DIR, "twitter-image.tsx")))

    def test_core_components_exist(self):
        """Verify essential UI components exist in src/components/."""
        essential_components = [
            "Home.tsx",
            "Nav.tsx",
            "Projects.tsx",
            "Experience.tsx",
            "Contact.tsx",
            "Footer.tsx",
            "CypherShowcase.tsx",
            "PyShareShowcase.tsx",
            "ThemeToggle.tsx",
            "CommandMenu.tsx",
            "InteractiveCli.tsx",
            "CodeTerminal.tsx",
        ]
        for comp in essential_components:
            comp_path = os.path.join(COMPONENTS_DIR, comp)
            self.assertTrue(
                os.path.isfile(comp_path),
                f"Missing component: {comp_path}",
            )

    def test_glassmorphism_globals_css(self):
        """Verify globals.css contains Living Flow / glassmorphism tokens and dark mode base."""
        css_path = os.path.join(APP_DIR, "globals.css")
        self.assertTrue(os.path.isfile(css_path))
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()

        # Check core color tokens
        self.assertIn("--background", css)
        self.assertIn("--card-bg", css)
        self.assertIn("--card-border", css)
        self.assertIn("--nav-bg", css)


if __name__ == "__main__":
    unittest.main()
