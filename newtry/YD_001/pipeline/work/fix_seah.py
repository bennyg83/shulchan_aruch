from pathlib import Path
p = Path("sk_en_data.py")
t = p.read_text(encoding="utf-8")
t = t.replace("se\\'ah", "__SEAH__")
t = t.replace("se'ah", "se\\'ah")
t = t.replace("__SEAH__", "se\\'ah")
p.write_text(t, encoding="utf-8")
import py_compile
py_compile.compile("sk_en_data.py", doraise=True)
print("fixed")
