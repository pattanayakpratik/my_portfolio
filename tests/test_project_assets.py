"""
Unit tests validating static assets, project banners, HUD screenshots, icons, and PDF documents.
"""

import os
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ASSETS_DIR = os.path.join(ROOT_DIR, "src", "assets", "projects")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")


class TestProjectAssets(unittest.TestCase):
    """Test suite ensuring all referenced media assets exist and are non-empty."""

    def test_featured_banners(self):
        """Verify 16:9 featured banners exist for Cypher and PyShare."""
        cypher_asset = os.path.join(ASSETS_DIR, "cypher.png")
        pyshare_asset = os.path.join(ASSETS_DIR, "pyshare.png")

        self.assertTrue(os.path.isfile(cypher_asset), f"Missing {cypher_asset}")
        self.assertTrue(os.path.isfile(pyshare_asset), f"Missing {pyshare_asset}")

        self.assertGreater(
            os.path.getsize(cypher_asset),
            10000,
            "Cypher banner asset is too small or empty",
        )
        self.assertGreater(
            os.path.getsize(pyshare_asset),
            10000,
            "PyShare banner asset is too small or empty",
        )

    def test_cypher_public_hud_screenshots(self):
        """Verify Cypher showcase screenshots exist in public/projects/cypher/."""
        cypher_public = os.path.join(PUBLIC_DIR, "projects", "cypher")
        required_screens = [
            "banner.png",
            "cypher_gui_idle.png",
            "cypher_gui_listening.png",
            "cypher_gui_processing.png",
            "cypher_gui_speaking.png",
            "cypher_settings_dialog.png",
        ]
        for screen in required_screens:
            file_path = os.path.join(cypher_public, screen)
            self.assertTrue(
                os.path.isfile(file_path),
                f"Missing Cypher public HUD asset: {file_path}",
            )
            self.assertGreater(
                os.path.getsize(file_path),
                1000,
                f"Cypher HUD asset {screen} is empty",
            )

    def test_pyshare_public_assets(self):
        """Verify PyShare showcase screenshots exist in public/projects/pyshare/."""
        pyshare_public = os.path.join(PUBLIC_DIR, "projects", "pyshare")
        required_pyshare = [
            "banner.png",
            "app_icon.png",
            "desktop_client.png",
            "desktop_host.png",
            "host_dark.png",
            "web_transfer.png",
        ]
        for screen in required_pyshare:
            file_path = os.path.join(pyshare_public, screen)
            self.assertTrue(
                os.path.isfile(file_path),
                f"Missing PyShare public asset: {file_path}",
            )
            self.assertGreater(
                os.path.getsize(file_path),
                1000,
                f"PyShare asset {screen} is empty",
            )

    def test_resume_and_certificates(self):
        """Verify resume PDF and certification PDFs exist in public directory."""
        resume_pdf = os.path.join(PUBLIC_DIR, "Pratik_Pattanayak_Resume.pdf")
        aws_pdf = os.path.join(PUBLIC_DIR, "certifications", "AIMLbyAWS.pdf")
        pyds_pdf = os.path.join(PUBLIC_DIR, "certifications", "pydataScience.pdf")

        self.assertTrue(os.path.isfile(resume_pdf), f"Missing resume at {resume_pdf}")
        self.assertTrue(os.path.isfile(aws_pdf), f"Missing AWS cert at {aws_pdf}")
        self.assertTrue(os.path.isfile(pyds_pdf), f"Missing Data Science cert at {pyds_pdf}")

    def test_core_tech_svg_icons(self):
        """Verify SVG tech icons exist in public/svg/tech/."""
        svg_tech = os.path.join(PUBLIC_DIR, "svg", "tech")
        required_svgs = [
            "python.svg",
            "next.svg",
            "postgresql.svg",
            "aws.svg",
            "gemini.svg",
            "typescript.svg",
            "react.svg",
            "git.svg",
            "github.svg",
        ]
        for icon in required_svgs:
            file_path = os.path.join(svg_tech, icon)
            self.assertTrue(
                os.path.isfile(file_path),
                f"Missing tech SVG icon: {file_path}",
            )


if __name__ == "__main__":
    unittest.main()
