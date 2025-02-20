package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"io/ioutil"
	s "strings"
)

var printu = fmt.Println

func ternaryu[T any](i int, req, res T) T {
	if i == 0 {
		return res
	}
	return req
}

/* :main */
func main() {
	origin := http.StripPrefix("/www/", http.FileServer(http.Dir("./www")))
	wrapped := http.HandlerFunc(func(writer http.ResponseWriter, req *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Methods", "POST, GET")
		writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		origin.ServeHTTP(writer, req)
	})

	http.Handle("/www/", wrapped)
	http.HandleFunc("/", serveTemplateu)
	http.HandleFunc("/fileupload", fileUploadHandler)

	printu("Listening on :8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func serveTemplateu(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("www/work", "layout.html")
	u := ternaryu(s.Compare(r.URL.Path, "/"), r.URL.Path + ".html", "index.html")
	fp := filepath.Join("www/ware", filepath.Clean(u))

	/* Return a 404 if the template doesn't exist /// */
	info, err := os.Stat(fp)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	/* Return a 404 if the request is for a directory /// */
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpl, err := template.ParseFiles(lp, fp)
	if err != nil {
		/* Log the detailed error /// */
		log.Print(err.Error())
		/* Return a generic "Internal Server Error" message /// */
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = tmpl.ExecuteTemplate(w, "layout", nil)
	if err != nil {
		log.Print(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}
/* main */



/* :fileUploadHandler */
func isValidFileType(file []byte) bool {
	typ := http.DetectContentType(file)
	arr := []string{"image/svg+xml", "application/xml", "text/xml", "text/plain"}
	r := false
	for _, t := range arr {
		if s.HasPrefix(typ, t) {
			r = true // Remove the 'r :=', just assign to 'r'
			break // Exit the loop early if a match is found
		}
	}
	return r
	// return s.HasPrefix(fileType, "image/") // Only allow images
}

func createFile(filename string) (*os.File, error) {
	// Create an uploads directory if it doesn’t exist
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
			os.Mkdir("uploads", 0755)
	}

	// Build the file path and create it
	dst, err := os.Create(filepath.Join("uploads", filename))
	if err != nil {
			return nil, err
	}

	return dst, nil
}

func fileUploadHandler(w http.ResponseWriter, r *http.Request) {
	// Limit file size to 10MB. This line saves you from those accidental 100MB uploads!
	r.ParseMultipartForm(10 << 20)

	// Retrieve the file from form data
	file, handler, err := r.FormFile("file")
	if err != nil {
			http.Error(w, "Error retrieving the file", http.StatusBadRequest)
			return
	}
	defer file.Close()

	fmt.Fprintf(w, "Uploaded File: %s\n", handler.Filename)
	fmt.Fprintf(w, "File Size: %d\n", handler.Size)
	fmt.Fprintf(w, "MIME Header: %v\n", handler.Header)

	// Now let’s save it locally
	dst, err := createFile(handler.Filename)
	if err != nil {
			http.Error(w, "Error saving the file", http.StatusInternalServerError)
			return
	}
	defer dst.Close()

	// Copy the uploaded file to the destination file
	if _, err := dst.ReadFrom(file); err != nil {
			http.Error(w, "Error saving the file", http.StatusInternalServerError)
	}

	 // Read the file into a byte slice to validate its type
	 fileBytes, err := ioutil.ReadAll(file)
	 if err != nil {
			 http.Error(w, "Invalid file", http.StatusBadRequest)
			 return
	 }

	 if !isValidFileType(fileBytes) {
			 http.Error(w, "Invalid file type", http.StatusUnsupportedMediaType)
			 return
	 }

	 // Proceed with saving the file
	 if _, err := dst.Write(fileBytes); err != nil {
			 http.Error(w, "Error saving the file", http.StatusInternalServerError)
	 }
}
/* fileUploadHandler */
