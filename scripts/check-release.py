"""Review the generated artifact and staged text without displaying potential secrets."""
from pathlib import Path
import hashlib,json,re,subprocess
root=Path(__file__).resolve().parents[1]
out=root/'dist'
deny={'.git','.agents','codex-handoff','node_modules','.vercel','.wrangler','scripts','output','package.json','wrangler.jsonc','AGENTS.md'}
files=[]
for p in sorted(out.rglob('*')):
    if not p.is_file():continue
    rel=p.relative_to(out)
    assert not p.is_symlink() and not set(rel.parts)&deny, f'Private artifact path: {rel}'
    files.append({'path':rel.as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
patterns={
 'private-key':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
 'github-token':re.compile(r'gh[pousr]_[A-Za-z0-9]{30,}'),
 'aws-access-key':re.compile(r'AKIA[A-Z0-9]{16}'),
 'cloudflare-api-token':re.compile(r'(?:CLOUDFLARE_API_TOKEN|CF_API_TOKEN)\s*[=:]\s*[\"\x27]?[A-Za-z0-9_-]{30,}'),
}
names=subprocess.check_output(['git','diff','--cached','--name-only','--diff-filter=ACM'],cwd=root,text=True).splitlines()
findings=[]
for name in names:
    p=root/name
    if p.suffix.lower() in {'.png','.jpg','.webp','.woff2','.ico'}:continue
    text=subprocess.check_output(['git','show',':'+name],cwd=root).decode('utf-8','replace')
    for kind,pattern in patterns.items():
        if pattern.search(text):findings.append({'path':name,'kind':kind})
assert not findings, f'Secret-pattern findings (values withheld): {findings}'
evidence=root/'output/release-artifact.json'
evidence.parent.mkdir(exist_ok=True)
evidence.write_text(json.dumps({'files':files,'count':len(files),'totalBytes':sum(f['bytes'] for f in files),'stagedTextScan':'custom patterns; not Gitleaks','stagedPaths':len(names),'secretFindings':findings},indent=2),'utf-8')
print(json.dumps({'publicFiles':len(files),'totalBytes':sum(f['bytes'] for f in files),'stagedPaths':len(names),'secretFindings':0,'manifest':str(evidence)}))
