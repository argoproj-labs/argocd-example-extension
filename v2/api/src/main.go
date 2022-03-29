package main

import (
	"encoding/json"
	"fmt"
	"github.com/spaceapegames/go-wavefront"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	client, err := wavefront.NewClient(
		&wavefront.Config{
			Address: os.Getenv("ADDRESS"),
			Token:   os.Getenv("TOKEN"),
		},
	)
	if err != nil {
		panic(err)
	}
	err = http.ListenAndServe(":3983", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != os.Getenv("AUTHORIZATION") {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		parts := strings.Split(r.URL.Path, "/")
		if len(parts) != 6 {
			w.WriteHeader(http.StatusBadRequest)
			return

		}

		namespace, query := parts[4], parts[5]

		log.Printf("%s,%s\n", namespace, query)

		queryString := map[string]string{
			"memory_request": fmt.Sprintf(`sum(align(60s, mean, align(1m, ts("heapster.pod.memory.request", namespace_name=%s))), cluster)`, namespace),
			"memory_usage":   fmt.Sprintf(`sum(align(60s, mean, align(1m, ts("heapster.pod.memory.usage", namespace_name=%s))), cluster)`, namespace),
			"cpu_request":    fmt.Sprintf(`sum(align(60s, mean, align(1m, ts("heapster.pod.cpu.request",  namespace_name=%s))) , cluster)/1000`, namespace),
			"cpu_usage":      fmt.Sprintf(`sum(align(60s, mean, align(1m, ts("heapster.pod.cpu.usage_rate", namespace_name=%s))) , cluster)/1000`, namespace),
		}[query]

		params := &wavefront.QueryParams{
			QueryString: queryString,
			EndTime:     strconv.FormatInt(time.Now().Unix(), 10),
			StartTime:   strconv.FormatInt(time.Now().Add(-3*time.Minute).Unix(), 10),
			Granularity: "s",
			StrictMode:  true,
		}
		result, err := client.NewQuery(params).Execute()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(result)
	}))
	if err != nil {
		panic(err)
	}
}
