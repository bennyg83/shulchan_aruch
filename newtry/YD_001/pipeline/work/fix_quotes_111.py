"""Fix mismatched string delimiters in translations_111_data.py."""
from pathlib import Path

path = Path(__file__).with_name("translations_111_data.py")
lines = path.read_text(encoding="utf-8").splitlines()
fixes = []

for i, line in enumerate(lines):
    if not line.startswith("            "):
        continue
    content = line[12:]
    if not content:
        continue
    # Single-quoted Python string (starts with ')
    if content[0] == "'" and content.endswith('. "'):
        new = line[:-2] + ". '"
        if new != line:
            fixes.append((i + 1, "sq_end_dq"))
            lines[i] = new
    # Double-quoted Python string (starts with " but not '"')
    elif content[0] == '"' and not content.startswith('"\'') and content.endswith(".'"):
        new = line[:-1] + '."'
        if new != line:
            fixes.append((i + 1, "dq_end_sq"))
            lines[i] = new

path.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"Fixed {len(fixes)} lines:")
for ln, kind in fixes:
    print(f"  line {ln}: {kind}")
