package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type response struct {
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
	http.HandleFunc("/applications", func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != "Bearer LetMeIn" {
			http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
			return
		}
		log.Printf("claims-sub=%s\n", r.Header.Get("claims-sub"))
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/json; charset=utf-8")
		_ = json.NewEncoder(w).Encode(response{Message: "Hello!"})
	})
	err := http.ListenAndServe(":3983", nil)
	if err != nil {
		panic(err)
	}
}
