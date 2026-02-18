install:
	npm install || true

lint:
	npm run lint || true

test:
	npm run test

build:
	npm run build || true

typecheck:
	npm run typecheck || true

format:
	npm run format || true

validate: install lint test build typecheck

branch:
	git checkout -b feature/auto-$(shell date +%s)

commit:
	git add .
	git commit -m "auto: AI update" || true

push:
	git push -u origin HEAD

pr:
	gh pr create --fill

auto-pr: branch commit push pr
