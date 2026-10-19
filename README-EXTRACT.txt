MALAYSIA — BETWEEN PLACES | CODEX DESKTOP HANDOFF
====================================================

This ZIP contains an execution handoff kit (docs, scripts, templates),
NOT a redesigned or already deployed website.

TARGET REPOSITORY (Windows):
C:\Users\moham\OneDrive\Desktop\malaysia

1. BACK UP existing AGENTS.md if one already exists. Merge instructions rather
   than overwriting. If your folder already contains codex-handoff, check
   for conflicting files before extraction.
2. Extract the ZIP's contents to the REPOSITORY ROOT, not a nested new folder.
   Expected paths:
     C:\Users\moham\OneDrive\Desktop\malaysia\AGENTS.md
     C:\Users\moham\OneDrive\Desktop\malaysia\codex-handoff\START-HERE.md
3. From CMD:
     cd /d "C:\Users\moham\OneDrive\Desktop\malaysia"
     py codex-handoff\scripts\check_handoff.py
4. Reopen that folder in Codex Desktop, start a NEW session, then issue:

   Execute the approved Malaysia — Between Places production handoff in
   AGENTS.md and codex-handoff/START-HERE.md. Implement, test and deploy the
   redesigned static site to malaysia.ismailstudio.my autonomously within the
   approved zero-incremental-cost scope. Do not stop after planning. Record
   real results and report genuine external blockers, if any.

5. Select GPT-6.1 Sol Ultra in the UI if the model/effort choice is available;
   otherwise use the best available supported reasoning effort.

DEPLOYMENT NOTE: This ZIP does not alter your existing website, DNS, GitHub or
Vercel project. Codex Desktop performs subsequent execution after extraction.
Cloudflare Workers Static Assets is the recommended primary hosting target;
Vercel redirect is a last step AFTER verified Cloudflare launch.

DEPENDENCIES: Python 3 for supplied scripts; Node 22+ and browser tooling for
some installed skills. No dependency auto-installs or paid products are run.

Do not upload AGENTS.md, .agents, codex-handoff, tokens, source-only files or
secrets to your public site. `build_static.py` uses explicit public allowlists.
