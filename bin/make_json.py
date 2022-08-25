#!/usr/bin/env python3

""" Super-crude script to extract the text from HTML files and output
    it in JSON format where the keys are the HTML filenames. """

import argparse
import json
import sys
from pathlib import Path

from bs4 import BeautifulSoup


def assemble_text(content_path):
    output = []
    for chapter_html in Path(content_path).glob("*.html"):
        if chapter_html.name.endswith("_title.html"):
            continue
        if chapter_html.name.endswith("_toc.html"):
            continue
        print("=========================", file=sys.stderr)
        print(chapter_html.name, file=sys.stderr)

        with chapter_html.open(encoding="utf8") as _fh:
            text = BeautifulSoup(_fh.read(), "lxml").get_text()

        output.append({"id": chapter_html.name, "text": text})

    return output


def main():
    """Command-line entry-point."""
    parser = argparse.ArgumentParser(description="Description: {}".format(__file__))

    parser.add_argument(
        "--content-path",
        action="store",
        required=True,
        help="Companion content directory to build JSON from (e.g. DH/content).",
    )

    args = parser.parse_args()

    output = assemble_text(args.content_path)
    json.dump(output, sys.stdout)


if __name__ == "__main__":
    main()
