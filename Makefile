default:build

build: clean mount ui backend

mount:
	mkdir -p dist
ui:
	rm -rf ./dist/build
	cd ./frontend/ui && npm run build
	mv ./frontend/ui/build ./dist

backend:
	GOOS=linux CGO_ENABLED=0 go build -o dist/ui

convey:
	goconvey --port 8890

clean:
	rm -rf ./dist && rm -rf ./frontend/ui/build
run:
	./dist/ui

test:
	go test ../... -v