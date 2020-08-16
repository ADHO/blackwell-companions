#!/usr/bin/env python3

""" Module Description """

import json
import sys
from pathlib import Path

from bs4 import BeautifulSoup


def main():
    """ Command-line entry-point. """

    output = []
    for chapter_html in (Path(__file__).parent / "../DH_html").glob("*.html"):
        print("=========================", file=sys.stderr)
        print(chapter_html.name, file=sys.stderr)

        with chapter_html.open() as _fh:
            text = BeautifulSoup(_fh.read(), "lxml").get_text()

        output.append({"id": chapter_html.name, "text": text})

    json.dump(output, sys.stdout)


if __name__ == "__main__":
    main()
