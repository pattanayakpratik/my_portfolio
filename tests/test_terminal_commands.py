"""
Unit tests validating interactive terminal CLI commands and responses.
"""

import os
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CLI_PATH = os.path.join(ROOT_DIR, "src", "data", "terminalCli.ts")
SNIPPETS_PATH = os.path.join(ROOT_DIR, "src", "data", "terminalSnippets.ts")


class TestTerminalCommands(unittest.TestCase):
    """Test suite validating interactive terminal CLI commands and code snippets."""

    def test_cli_commands_defined(self):
        """Verify terminal commands (neofetch, demo, projects, skills, contact, clear) exist."""
        self.assertTrue(os.path.isfile(CLI_PATH))
        with open(CLI_PATH, "r", encoding="utf-8") as f:
            cli_code = f.read()

        expected_cmds = ["neofetch", "projects", "skills", "contact", "clear", "matrix"]
        for cmd in expected_cmds:
            self.assertIn(
                cmd,
                cli_code,
                f"Expected CLI command '{cmd}' not found in terminalCli.ts",
            )

    def test_terminal_code_snippets(self):
        """Verify server code snippets in terminal widget (FastAPI, Python)."""
        self.assertTrue(os.path.isfile(SNIPPETS_PATH))
        with open(SNIPPETS_PATH, "r", encoding="utf-8") as f:
            snippets_code = f.read()

        self.assertIn("python", snippets_code)
        self.assertIn("analytics.py", snippets_code)


if __name__ == "__main__":
    unittest.main()
