import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Kabupaten } from '../kabupaten';
import { Kecamatan } from '../kecamatan';
import { Kelurahan } from '../kelurahan';

import { Provinsi } from '../provinsi';
import { WilayahindoService } from '../wilayahindo.service';

@Component({
  selector: 'app-wilayahindo',
  templateUrl: './wilayahindo.component.html',
  styleUrls: ['./wilayahindo.component.css']
})
export class WilayahindoComponent implements OnInit {

  allProvinsi: Provinsi[] = [];
  allKabupaten: Kabupaten[] = [];
  allKecamatan: Kecamatan[] = [];
  allKelurahan: Kelurahan[] = [];

  provinsi = new FormControl('');
  kabupaten = new FormControl('');
  kecamatan = new FormControl('');
  kelurahan = new FormControl('');

  constructor(
    private wilayahIndoService: WilayahindoService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllProvinsi();
    this.provinsi.valueChanges.subscribe(provinsiId => this.getAllKabupaten(provinsiId));
    this.kabupaten.valueChanges.subscribe(kabupatenId => this.getAllKecamatan(kabupatenId));
    this.kecamatan.valueChanges.subscribe(kecamatanId => this.getAllKelurahan(kecamatanId));
  }

  getAllProvinsi(): void {
    this.wilayahIndoService.getAllProvinsi()
      .subscribe(result => this.allProvinsi = result);
  }

  getAllKabupaten(provinsiId: string): void {
    this.wilayahIndoService.getAllKabupaten(provinsiId)
      .subscribe(result => {
        this.allKabupaten = result;
        this.reset(this.kabupaten);
      });
  }

  getAllKecamatan(kabupatenId: string): void {
    this.wilayahIndoService.getAllKecamatan(kabupatenId)
      .subscribe(result => { 
        this.allKecamatan = result; 
        this.reset(this.kecamatan)
       });
  }

  getAllKelurahan(kecamatanId: string): void {
      this.wilayahIndoService.getAllKelurahan(kecamatanId)
        .subscribe(result => {
          this.allKelurahan = result;
          this.reset(this.kelurahan);
        });
  }

  private reset(ctrl: FormControl) {
    ctrl.setValue(-1);
  }

}
