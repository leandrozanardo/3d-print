# Gates: melhorar-docs-bambu-a1-mini

OWNS: docs/**, docs/plans/melhorar-docs-bambu-a1-mini/**, scripts/verify-bambu-a1-mini-docs-demand.mjs

Scope: Dual-track wiki — oficial Bambu no canônico + playbook/heurísticas A1 Mini em docs/projeto/, slice validate-wiki sem erros novos nesta demanda.

- [x] G1: Páginas desta demanda sem erros novos no validate-wiki strict
  AC-ID: AC-05
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g1
  EXPECT: demand wiki slice verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=9adedf2e07596992463379ba24274e61da4c4e71b3ca89475667a45d83bfd353; exit=0; EXPECT=matched; output-sha256=6b86cda17cf357e4032bbfb90908e850e709a2b5939d9d995561245f6f33ef21; output-bytes=38; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G2: Playbook MakerWorld→receita existe e está linkado no hub workflow
  AC-ID: AC-02
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g2
  EXPECT: makerworld playbook verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=0b220b8ae21e7293c2b8f20d23bb28ce1cf2c0e1bbeed5e3ad0472ced98fc65d; exit=0; EXPECT=matched; output-sha256=a0cb0c336e9d2da989c97caaf333f7967b71bd52cfef01fe209807f09ded97ab; output-bytes=40; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G3: Canônico A1 Mini cita wiki oficial e volume 180
  AC-ID: AC-01
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g3
  EXPECT: canonical a1-mini verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=3142f83ecc3e7a14c9713e78d57d1ce43e33e35200d864d5e155ea45995bd28a; exit=0; EXPECT=matched; output-sha256=ea05a1aa3f54281b5c77d1f278009c474715dc5fe12c26b94a185221ac3229b9; output-bytes=38; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G4: Fontes comunitárias registradas com limites (não hard safety)
  AC-ID: AC-04
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g4
  EXPECT: community evidence markers verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=cd47472931b21a2f249bd5223f21ace28ec5fcd3b9faccc123492031009645a2; exit=0; EXPECT=matched; output-sha256=4af71934d7cf6db8cf889d8ef3cc36b06310bc75c6d6bcb8768b937bbd8146f2; output-bytes=47; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G5: Troubleshooting hub cobre erros comuns (adesão, stringing, warping, supports)
  AC-ID: AC-03
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g5
  EXPECT: troubleshooting coverage verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=d3fa4b995254a3b41bc8c66c534664147af9bac20e689288745485ee2162887a; exit=0; EXPECT=matched; output-sha256=008b24b512c3b826c5f8544033c3682b4dc7ef643176c836fe1c3e7b35732eee; output-bytes=45; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G6: Hubs projeto e canônico apontam o playbook / A1 Mini optimization
  AC-ID: AC-06
  CHECK: node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g6
  EXPECT: hub bridge verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=5d0859ccdbf3dac2416caf0a0e1e80ac436e1dc119c00675a5259dd18a7037a3; exit=0; EXPECT=matched; output-sha256=90d698e8ac446ffc8a8d141d82d443b097e0777e52a17d77bb2f2b44021c08e9; output-bytes=31; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G7: Graft wiring graph in sync após edições
  DoD-ID: DoD-05
  CHECK: pnpm run graft:refresh
  EXPECT: graph check: OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=39e19cbdd6062353842f9cbb4926752bf92e0d65b16bb8ee69d3995c30ef4119; exit=0; EXPECT=matched; output-sha256=92eb79270903d21076656a95911443beead9b06efc34e2a69ddb3921b5dd98ce; output-bytes=14068; shell=C:\Windows\system32\cmd.exe; cwd=D:\Projetos\3d-print\docs\plans\melhorar-docs-bambu-a1-mini; path=93c3c6bace3d/60 entries

- [x] G8: Revisão manual — claims comunitários não viraram regra de segurança absoluta
  AC-ID: AC-04
  EVIDENCE: 2026-10-15 review — forum/MakerWorld claims labeled hypothesis/heuristic + validate on printer; hard safety remains manufacturer/wiki/SDS (blob, hot surfaces, Not Recommended ABS/ASA). No absolute safety rules promoted from community.
