import unittest

from semantic_pipeline import run_pipeline


class SemanticPipelineTests(unittest.TestCase):
    def test_pipeline_returns_expected_structures(self):
        notes = [
            {"id": "n1", "content": "тревога и усталость мешают сну"},
            {"id": "n2", "content": "конфликт между долгом и истощением"},
        ]

        units, deterministic_links, hypotheses, tensions = run_pipeline(notes)

        self.assertGreater(len(units), 0)
        self.assertGreater(len(deterministic_links), 0)
        self.assertGreater(len(hypotheses), 0)
        self.assertGreaterEqual(len(tensions), 1)


if __name__ == "__main__":
    unittest.main()
