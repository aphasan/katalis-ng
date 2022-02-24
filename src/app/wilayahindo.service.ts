import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Provinsi } from './provinsi';
import { Kabupaten } from './kabupaten';
import { Kecamatan } from './kecamatan';
import { Kelurahan } from './kelurahan';

@Injectable({
  providedIn: 'root'
})
export class WilayahindoService {

  private allProvinsiUrl = '/api-wilayah-indonesia/api/provinces.json';
  private allKabupatenUrl = '/api-wilayah-indonesia/api/regencies';
  private allKecamatanUrl = '/api-wilayah-indonesia/api/districts';
  private allKelurahanUrl = '/api-wilayah-indonesia/api/villages';

  constructor(private http: HttpClient) { }

  getAllProvinsi(): Observable<Provinsi[]> {
    return this.http.get<Provinsi[]>(this.allProvinsiUrl)
      .pipe(catchError(this.handleError<Provinsi[]>(this.allProvinsiUrl, [])));
  }

  getAllKabupaten(provinceId: string): Observable<Kabupaten[]> {
    const url = `${this.allKabupatenUrl}/${provinceId}.json`
    return this.http.get<Kabupaten[]>(url)
      .pipe(catchError(this.handleError<Kabupaten[]>(url, [])));
  }

  getAllKecamatan(kabupatenId: string): Observable<Kecamatan[]> {
    const url = `${this.allKecamatanUrl}/${kabupatenId}.json`
    return this.http.get<Kecamatan[]>(url)
      .pipe(catchError(this.handleError<Kecamatan[]>(url, [])));
  }

  getAllKelurahan(kecamatanId: string): Observable<Kelurahan[]> {
    const url = `${this.allKelurahanUrl}/${kecamatanId}.json`
    return this.http.get<Kelurahan[]>(url)
      .pipe(catchError(this.handleError<Kelurahan[]>(url, [])));
  }

  private handleError<T>(url: string, result: T) {
    return (error: any): Observable<T> => {
      console.error(url)
      return of(result as T)
    };
  }

}
