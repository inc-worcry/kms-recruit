#!/usr/bin/env python3
"""index.html の日本語テキストに BudouX で文節区切りの <wbr> を入れる。

CSS の word-break:keep-all と組み合わせて、単語の途中で改行されないようにする。
テキストを編集したら再実行する（既存の <wbr> は一度すべて除去してから入れ直すので何度実行してもよい）。

    pip install budoux
    python3 tools/linebreak.py
"""
import pathlib
import re

import budoux

INDEX = pathlib.Path(__file__).resolve().parent.parent / "index.html"
JP = re.compile(r"[぀-ヿ㐀-鿿＀-￯]")
SKIP_TAGS = re.compile(r"<\s*(/)?\s*(script|style|title|textarea)\b", re.I)


def main():
    parser = budoux.load_default_japanese_parser()
    src = INDEX.read_text(encoding="utf-8").replace("<wbr>", "")
    head, sep, body = src.partition("<body>")

    out, skipping = [], None
    for tok in re.split(r"(<[^>]+>)", body):
        if tok.startswith("<"):
            m = SKIP_TAGS.match(tok)
            if m:
                skipping = None if m.group(1) else m.group(2).lower()
            out.append(tok)
            continue
        if skipping or not JP.search(tok):
            out.append(tok)
            continue
        # 空白・改行はそのまま残す（FAQ回答は white-space:pre-line で改行を使っている）
        out.append("".join(
            "<wbr>".join(parser.parse(s)) if s and not s.isspace() and JP.search(s) else s
            for s in re.split(r"(\s+)", tok)
        ))

    INDEX.write_text(head + sep + "".join(out), encoding="utf-8")
    print("wbr inserted:", "".join(out).count("<wbr>"))


if __name__ == "__main__":
    main()
