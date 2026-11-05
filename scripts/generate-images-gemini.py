#!/usr/bin/env python3
"""Generate Koovalam images with Gemini (gemini-2.5-flash-image) via custom.gemini.

Reads image-prompts.json in the project root, writes public/images/<name>.png.
Skips images that already exist unless --force is given. Uses the same
credential-surrogate mechanism as bin/gemini.py, so no API key appears here,
in arguments, or in logs. Usage:
  python3 scripts/generate-images-gemini.py [--only NAME] [--force]
"""
import argparse, base64, json, sys, urllib.error, urllib.request
from pathlib import Path
sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_json_response

BASE = "https://generativelanguage.googleapis.com/v1beta"
import os
MODEL = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")
ROOT = Path(__file__).resolve().parent.parent
ASPECT = {"landscape": "3:2", "square": "1:1", "portrait": "3:4"}

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise RuntimeError("redirect refused")

def generate(prompt, aspect):
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": aspect},
        },
    }
    req = urllib.request.Request(
        f"{BASE}/models/{MODEL}:generateContent",
        data=json.dumps(payload).encode(), method="POST")
    req.add_header("Content-Type", "application/json")
    add_surrogate_to_request(req, "custom.gemini",
                             allowed_hosts=["generativelanguage.googleapis.com"])
    with urllib.request.build_opener(NoRedirect()).open(req, timeout=300) as resp:
        result = read_json_response(resp)
    for cand in result.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            data = part.get("inlineData", {}).get("data")
            if data:
                return base64.b64decode(data)
    raise RuntimeError(f"no image in response: {json.dumps(result)[:400]}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only"); ap.add_argument("--force", action="store_true")
    args = ap.parse_args()
    config = json.loads((ROOT / "image-prompts.json").read_text())
    out = ROOT / "public" / "images"; out.mkdir(parents=True, exist_ok=True)
    items = config["images"]
    if args.only:
        items = [i for i in items if i["name"] == args.only]
        if not items: print(f"no image named {args.only}"); return 1
    done = skipped = failed = 0
    for item in items:
        png = out / f"{item['name']}.png"
        if png.exists() and not args.force:
            print(f"- skip   {item['name']} (exists)"); skipped += 1; continue
        prompt = f"{item['prompt']}\n\nStyle: {config['style']}\nAvoid: {config['avoid']}"
        print(f"- make   {item['name']} ({item['orientation']})", flush=True)
        try:
            png.write_bytes(generate(prompt, ASPECT.get(item["orientation"], "1:1")))
            print(f"  saved {png} ({png.stat().st_size} bytes)"); done += 1
        except Exception as e:
            print(f"  x failed {item['name']}: {e}"); failed += 1
    print(f"\nDone. generated: {done}, skipped: {skipped}, failed: {failed}")
    return 1 if failed else 0

if __name__ == "__main__":
    raise SystemExit(main())
