package main

import (
	"encoding/json"
	"net/http"
)

type response struct {
	Message string `json:"message"`
}

func main() {
	err := http.ListenAndServe(":3983", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != "Bearer LetMeIn" {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(response{Message: "Hello!"})
	}))
	if err != nil {
		panic(err)
	}
}
