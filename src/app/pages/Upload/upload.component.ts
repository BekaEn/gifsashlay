
// upload.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  title = '';
  file: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (this.file && this.title) {
      const formData = new FormData();
      formData.append('file', this.file, `${this.title}.gif`);

      this.http.post('http://localhost:3000/api/upload', formData, { responseType: 'text' }).pipe(
        finalize(() => {
          this.title = '';
          this.file = null;
        }),
        catchError(error => {
          console.error('There was an error uploading the file', error);
          return throwError(error);
        })
      ).subscribe(response => {
        console.log('File uploaded successfully');

        if (response.trim().startsWith('<')) {
          console.log('Response is HTML, not JSON');
        } else {
          try {
            const jsonResponse = JSON.parse(response);
            console.log(jsonResponse);
          } catch (error) {
            console.error('Error parsing JSON response', error);
          }
        }
      });
    }
  }
}