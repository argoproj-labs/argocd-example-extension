build:
	docker build -t example-extension:v1 .
run: build
	k3d image import example-extension:v1
	kubectl apply -k config
	kubectl rollout restart deploy/example-extension
	kubectl wait deploy/example-extension --for=condition=Available
	kubectl port-forward svc/example-extension 3983:3983
lint:
	go vet cmd
	goimports -w cmd
	go mod tidy
	kube-linter lint config
