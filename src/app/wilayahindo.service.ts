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

  private static GET_PROVINSI_URL = '/api-wilayah-indonesia/api/provinces.json';
  private static GET_KABUPATEN_URL = '/api-wilayah-indonesia/api/regencies';
  private static GET_KECAMATAN_URL = '/api-wilayah-indonesia/api/districts';
  private static GET_KELURAHAN_URL = '/api-wilayah-indonesia/api/villages';

  constructor(private http: HttpClient) { }  

  getAllProvinsi(): Observable<Provinsi[]> {
    return this.get<Provinsi>(WilayahindoService.GET_PROVINSI_URL);
  }

  getAllKabupaten(provinceId: string): Observable<Kabupaten[]> {
    const url = `${WilayahindoService.GET_KABUPATEN_URL}/${provinceId}.json`;
    return this.get<Kabupaten>(url);
  }

  getAllKecamatan(kabupatenId: string): Observable<Kecamatan[]> {
    const url = `${WilayahindoService.GET_KECAMATAN_URL}/${kabupatenId}.json`;
    return this.get<Kecamatan>(url);
  }

  getAllKelurahan(kecamatanId: string): Observable<Kelurahan[]> {
    const url = `${WilayahindoService.GET_KELURAHAN_URL}/${kecamatanId}.json`;
    return this.get<Kelurahan>(url);
  }

  private get<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError<T[]>(url, [])));
  }

  private handleError<T>(url: string, result: T) {
    return (error: any): Observable<T> => {
      console.error(url)
      return of(result as T);
    };
  }

}
