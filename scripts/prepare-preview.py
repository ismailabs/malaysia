"""Create a noindex copy of the reviewed, generated dist artifact."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
source=root/'dist'
target=root/'dist-preview'
assert source.is_dir() and (source/'index.html').is_file()
assert target.resolve().parent==root.resolve() and target.name=='dist-preview'
assert not target.is_symlink()
if target.exists():
    assert (target/'index.html').is_file() and (target/'_headers').is_file()
    shutil.rmtree(target)
shutil.copytree(source,target)
headers=target/'_headers'
headers.write_text(headers.read_text('utf-8').replace('/*\n','/*\n  X-Robots-Tag: noindex, nofollow\n',1),'utf-8',newline='\n')
print('Prepared reviewed dist-preview with X-Robots-Tag: noindex, nofollow.')
