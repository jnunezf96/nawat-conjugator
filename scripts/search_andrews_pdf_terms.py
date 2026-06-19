#!/usr/bin/env python3
"""Search Andrews PDF terms and return compact JSON evidence."""

from __future__ import annotations

import argparse
import contextlib
import json
import os
import re
import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except ImportError as exc:  # pragma: no cover - environment guard
    raise SystemExit("Missing pypdf. Use the bundled Codex Python runtime or install pypdf.") from exc


DEFAULT_PDF = Path("/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf")
DEFAULT_TERMS = ("deverbal nounstem", "denominal verbstem", "deverbal verbstem")


def parse_pages(value: str) -> set[int]:
    pages: set[int] = set()
    for raw_part in str(value or "").split(","):
        part = raw_part.strip()
        if not part:
            continue
        if "-" in part:
            start_text, end_text = part.split("-", 1)
            start = int(start_text.strip())
            end = int(end_text.strip())
            if end < start:
                start, end = end, start
            pages.update(range(start, end + 1))
        else:
            pages.add(int(part))
    return pages


def build_pattern(term: str) -> re.Pattern[str]:
    pieces = [re.escape(piece) for piece in term.split()]
    return re.compile(r"\b" + r"\s+".join(pieces) + r"s?\b", re.IGNORECASE)


def compact_text(value: str) -> str:
    return " ".join(str(value or "").split())


def search_pdf(pdf_path: Path, terms: list[str], context_chars: int, max_samples: int, pages: set[int] | None = None) -> dict:
    patterns = {term: build_pattern(term) for term in terms}
    hits: dict[str, list[dict]] = {term: [] for term in terms}
    with open(os.devnull, "w", encoding="utf-8") as devnull, contextlib.redirect_stderr(devnull):
        reader = PdfReader(str(pdf_path))
        for page_index, page in enumerate(reader.pages, start=1):
            if pages and page_index not in pages:
                continue
            try:
                text = compact_text(page.extract_text() or "")
            except Exception:
                continue
            if not text:
                continue
            for term, pattern in patterns.items():
                for match in pattern.finditer(text):
                    start = max(0, match.start() - context_chars)
                    end = min(len(text), match.end() + context_chars)
                    hits[term].append({
                        "page": page_index,
                        "context": text[start:end],
                    })
    return {
        "pdf": str(pdf_path),
        "terms": terms,
        "results": {
            term: {
                "count": len(term_hits),
                "samples": term_hits[:max_samples],
            }
            for term, term_hits in hits.items()
        },
    }


def extract_section_refs(text: str) -> list[str]:
    return sorted(set(re.findall(r"\b(?:§\s*)?(\d{1,2}\.\d+(?:\.\d+)*)", text)))[:24]


def extract_header(text: str) -> str:
    header_match = re.search(
        r"(LESSON\s+\d+\s+[^0-9]{0,90}|\b\d{1,2}\.\d+(?:\.\d+)*\.?\s+[^.]{0,110})",
        text,
        re.IGNORECASE,
    )
    return header_match.group(0).strip() if header_match else ""


def build_page_hit_clusters(pdf_path: Path, terms: list[str], pages: set[int] | None = None) -> dict:
    patterns = {term: build_pattern(term) for term in terms}
    clusters = []
    with open(os.devnull, "w", encoding="utf-8") as devnull, contextlib.redirect_stderr(devnull):
        reader = PdfReader(str(pdf_path))
        for page_index, page in enumerate(reader.pages, start=1):
            if pages and page_index not in pages:
                continue
            try:
                text = compact_text(page.extract_text() or "")
            except Exception:
                continue
            if not text:
                continue
            term_counts = {
                term: len(list(pattern.finditer(text)))
                for term, pattern in patterns.items()
            }
            if not any(term_counts.values()):
                continue
            clusters.append({
                "page": page_index,
                "termCounts": {term: count for term, count in term_counts.items() if count},
                "header": extract_header(text),
                "sectionRefs": extract_section_refs(text),
            })
    return {
        "pdf": str(pdf_path),
        "terms": terms,
        "clusterCount": len(clusters),
        "clusters": clusters,
    }


def inspect_pages(pdf_path: Path, terms: list[str], pages: set[int], context_chars: int, max_samples: int) -> dict:
    patterns = {term: build_pattern(term) for term in terms}
    inspected_pages = []
    with open(os.devnull, "w", encoding="utf-8") as devnull, contextlib.redirect_stderr(devnull):
        reader = PdfReader(str(pdf_path))
        for page_index, page in enumerate(reader.pages, start=1):
            if page_index not in pages:
                continue
            try:
                text = compact_text(page.extract_text() or "")
            except Exception:
                continue
            term_hits = []
            for term, pattern in patterns.items():
                for match in pattern.finditer(text):
                    start = max(0, match.start() - context_chars)
                    end = min(len(text), match.end() + context_chars)
                    term_hits.append({
                        "term": term,
                        "context": text[start:end],
                    })
            inspected_pages.append({
                "page": page_index,
                "header": extract_header(text),
                "sectionRefs": extract_section_refs(text),
                "termCounts": {
                    term: len(list(pattern.finditer(text)))
                    for term, pattern in patterns.items()
                    if len(list(pattern.finditer(text)))
                },
                "samples": term_hits[:max_samples],
            })
    return {
        "pdf": str(pdf_path),
        "terms": terms,
        "pages": sorted(pages),
        "pageCount": len(inspected_pages),
        "inspectedPages": inspected_pages,
    }


def extract_page_texts(pdf_path: Path, pages: set[int], max_chars: int = 7000) -> dict:
    extracted_pages = []
    with open(os.devnull, "w", encoding="utf-8") as devnull, contextlib.redirect_stderr(devnull):
        reader = PdfReader(str(pdf_path))
        for page_index, page in enumerate(reader.pages, start=1):
            if page_index not in pages:
                continue
            try:
                text = compact_text(page.extract_text() or "")
            except Exception:
                continue
            extracted_pages.append({
                "page": page_index,
                "header": extract_header(text),
                "sectionRefs": extract_section_refs(text),
                "text": text[:max_chars],
                "truncated": len(text) > max_chars,
                "charCount": len(text),
            })
    return {
        "pdf": str(pdf_path),
        "pages": sorted(pages),
        "pageCount": len(extracted_pages),
        "extractedPages": extracted_pages,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("terms", nargs="*", default=list(DEFAULT_TERMS))
    parser.add_argument("--pdf", default=str(DEFAULT_PDF))
    parser.add_argument("--context", type=int, default=180)
    parser.add_argument("--max-samples", type=int, default=12)
    parser.add_argument("--clusters", action="store_true", help="Return page-level term clusters and section references instead of context samples.")
    parser.add_argument("--pages", default="", help="Restrict search to comma-separated pages or ranges, for example 374,386,584-586.")
    parser.add_argument("--inspect-pages", action="store_true", help="Return page-level headers, section refs, and term contexts for selected pages.")
    parser.add_argument("--page-text", action="store_true", help="Return compact full-page text for selected pages.")
    parser.add_argument("--page-text-chars", type=int, default=7000, help="Maximum compact text characters per page for --page-text.")
    args = parser.parse_args()

    pdf_path = Path(args.pdf).expanduser()
    if not pdf_path.exists():
        parser.error(f"PDF not found: {pdf_path}")
    pages = parse_pages(args.pages) if args.pages else None
    payload = (
        extract_page_texts(pdf_path, pages or set(), args.page_text_chars)
        if args.page_text
        else inspect_pages(pdf_path, list(args.terms), pages or set(), args.context, args.max_samples)
        if args.inspect_pages
        else build_page_hit_clusters(pdf_path, list(args.terms), pages)
        if args.clusters
        else search_pdf(pdf_path, list(args.terms), args.context, args.max_samples, pages)
    )
    json.dump(payload, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
