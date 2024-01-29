package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	s "strings"
)

var printu = fmt.Println
func ternaryu[T any](i int, req, res T) T {
  if i == 0 { return res }
	return req
}

func main() {
	fs := http.FileServer(http.Dir("./ware"))
	http.Handle("/ware/", http.StripPrefix("/ware/", fs))
	http.HandleFunc("/", serveTemplateu)

	printu("Listening on :8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func serveTemplateu(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("work", "layout.html")

	u := ternaryu(s.Compare(r.URL.Path, "/"), r.URL.Path, "index.html")
	fp := filepath.Join("ware/page", filepath.Clean(u))
	
	/*/ Return a 404 if the template doesn't exist /*/
	info, err := os.Stat(fp)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	/*/ Return a 404 if the request is for a directory /*/
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpl, err := template.ParseFiles(lp, fp)
	if err != nil {
		/*/ Log the detailed error /*/
		log.Print(err.Error())
		/*/ Return a generic "Internal Server Error" message /*/
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = tmpl.ExecuteTemplate(w, "layout", nil)
	if err != nil {
		log.Print(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}
