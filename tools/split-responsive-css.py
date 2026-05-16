#!/usr/bin/env python3
"""Extract @media blocks from css/styles.css into css/responsive.css (one-time split helper)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
styles_path = ROOT / "css" / "styles.css"
responsive_path = ROOT / "css" / "responsive.css"

def main():
    lines = styles_path.read_text(encoding="utf-8").splitlines(True)
    out_main = []
    out_media = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        stripped = line.lstrip()
        if stripped.startswith("@media"):
            block = []
            depth = 0
            started = False
            while i < n:
                l = lines[i]
                block.append(l)
                if "{" in l:
                    started = True
                depth += l.count("{") - l.count("}")
                i += 1
                if started and depth <= 0:
                    break
            out_media.extend(block)
            if out_media and not out_media[-1].endswith("\n"):
                out_media.append("\n")
        else:
            out_main.append(line)
            i += 1

    banner = "/* Auto-extracted @media rules — load after css/styles.css */\n\n"
    responsive_path.write_text(banner + "".join(out_media), encoding="utf-8")
    styles_path.write_text("".join(out_main), encoding="utf-8")
    print(f"Wrote {responsive_path} ({len(out_media)} lines)")

if __name__ == "__main__":
    main()
