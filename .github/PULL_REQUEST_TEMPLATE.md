## Summary

What changed and why.

## Dataset

- Path(s): `mock/...`
- Record ids added or kept: 

## Checklist

- [ ] JSON parses
- [ ] Existing ids were not renamed unless this PR is meant to replace them
- [ ] Cross-references resolve (foreign ids exist in the related file)
- [ ] Fake data only (no real emails, phones, or card numbers)
- [ ] Edge states included if the UI needs them (empty, pending, cancelled)

## Test plan

- [ ] Opened the changed files and checked a few linked ids by hand
- [ ] Ran:

```sh
python3 -c "import json, pathlib; [json.loads(p.read_text()) for p in pathlib.Path('mock').rglob('*.json')]; print('ok')"
```
