default:build

build: clean mount ui backend

mount:
	mkdir -p front
ui:
	rm -rf ./dist/build
	cd ./frontend/ui && npm run build
	mv ./frontend/ui/build ./front

backend:
	GOOS=linux CGO_ENABLED=0 go build -o front/ui

convey:
	goconvey --port 8890

clean:
	rm -rf ./front && rm -rf ./frontend/ui/build
run:
	./front/ui

test:
	go test ../... -v