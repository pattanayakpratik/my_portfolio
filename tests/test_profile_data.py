"""
Unit tests for portfolio profile data integrity, content structure, and technical schemas.
"""

import os
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROFILE_PATH = os.path.join(ROOT_DIR, "src", "data", "profile.ts")


class TestProfileData(unittest.TestCase):
    """Test suite validating src/data/profile.ts contents and metadata."""

    @classmethod
    def setUpClass(cls):
        cls.assertTrue(
            os.path.exists(PROFILE_PATH),
            f"profile.ts missing at {PROFILE_PATH}",
        )
        with open(PROFILE_PATH, "r", encoding="utf-8") as f:
            cls.content = f.read()

    def test_profile_identity(self):
        """Verify core personal identity, title, and bio information."""
        self.assertIn("Pratik Pattanayak", self.content)
        self.assertIn("Backend & AI Engineer", self.content)
        self.assertIn("Mumbai, India", self.content)
        self.assertIn("mr.pratikpattanayak@gmail.com", self.content)

    def test_social_and_resume_links(self):
        """Verify external social profiles and resume paths."""
        self.assertIn("https://github.com/pattanayakpratik", self.content)
        self.assertIn("pattanayakpratik", self.content)
        self.assertIn("/Pratik_Pattanayak_Resume.pdf", self.content)

    def test_featured_projects(self):
        """Verify flagship featured projects: Cypher AI and PyShare."""
        # Cypher project checks
        self.assertIn('"Cypher"', self.content)
        self.assertIn("/projects/cypher", self.content)
        self.assertIn("https://github.com/pattanayakpratik/Cypher-AI", self.content)
        self.assertIn("cypher_gui_idle.png", self.content)
        self.assertIn("cypher_gui_speaking.png", self.content)
        self.assertIn("cypher_settings_dialog.png", self.content)

        # PyShare project checks
        self.assertIn('"PyShare"', self.content)
        self.assertIn("/projects/pyshare", self.content)
        self.assertIn("https://github.com/pattanayakpratik/PyShare", self.content)

    def test_all_github_projects_present(self):
        """Verify all major open-source repositories are integrated in otherProjects."""
        expected_repos = [
            "PulseEngine",
            "Smart Campus",
            "CTS Digital Score Card",
            "Flodo Task Manager",
            "PrimeTrade Quant Analytics",
            "AI Transaction Processor",
            "Binance Futures Bot",
            "Expense Tracker",
            "Dynamic PDF Generator",
            "Vibe Matcher",
            "Race AI Task Manager",
            "Amazon Marketplace UI",
        ]
        for repo_name in expected_repos:
            self.assertIn(
                repo_name,
                self.content,
                f"Expected repository '{repo_name}' not found in profile.ts",
            )

    def test_skills_inventory(self):
        """Verify core backend, AI, and systems engineering skills."""
        expected_skills = [
            "Python",
            "Flask",
            "Node.js",
            "Next.js",
            "PostgreSQL",
            "Supabase",
            "SQLite",
            "Gemini",
            "TypeScript",
            "React",
            "AWS",
            "Git",
        ]
        for skill in expected_skills:
            self.assertIn(
                f'"{skill}"',
                self.content,
                f"Skill '{skill}' missing from skills array in profile.ts",
            )

    def test_experience_timeline(self):
        """Verify professional work experience at Dirtcube Interactive and freelance."""
        self.assertIn("Dirtcube Interactive", self.content)
        self.assertIn("Backend Engineer", self.content)
        self.assertIn("Self-Employed / Freelance", self.content)

    def test_education_and_certifications(self):
        """Verify academic background and professional certifications."""
        self.assertIn("B.Sc. Information Technology", self.content)
        self.assertIn("CGPI 8.65", self.content)
        self.assertIn("AWS Certified", self.content)
        self.assertIn("Python for Data Science", self.content)


if __name__ == "__main__":
    unittest.main()
