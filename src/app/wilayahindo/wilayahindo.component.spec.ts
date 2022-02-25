import { TestBed } from "@angular/core/testing";
import { WilayahindoComponent } from "./wilayahindo.component";

import { Observable, of } from "rxjs";
import { Kabupaten } from "../kabupaten";
import { Kecamatan } from "../kecamatan";
import { Kelurahan } from "../kelurahan";
import { Provinsi } from "../provinsi";
import { WilayahindoService } from "../wilayahindo.service";

describe('WilayahindoComponent', () => {
    let component: WilayahindoComponent;
    let service: WilayahindoService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                WilayahindoComponent,
                { provide: WilayahindoService, useClass: MockWilayahindoService }
            ]
        });
        component = TestBed.inject(WilayahindoComponent);
        service = TestBed.inject(WilayahindoService);
    })

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should gather all Provinsi on initialization', () => {
        component.ngOnInit();
        expect(component.allProvinsi.length).toBeGreaterThan(0);
    });

    it('should gather all Kabupaten under selected Provinsi', () => {
        let sampleProvinsi: Provinsi[] = [{ "id": "11", "name": "ACEH" }, { "id": "12", "name": "SUMATERA UTARA" }];
        sampleProvinsi.every(provinsi => {
            component.getAllKabupaten(provinsi.id);
            component.allKabupaten.every(kabupaten => {
                expect(kabupaten.province_id).toEqual(provinsi.id);
            })
        });
    });

    it('should gather all Kecamatan under selected Kabupaten', () => {
        let sampleKabupaten: Kabupaten[] = [{ "id": "1101", "province_id": "11", "name": "KABUPATEN SIMEULUE" }, { "id": "1102", "province_id": "11", "name": "KABUPATEN ACEH SINGKIL" }];
        sampleKabupaten.every(kabupaten => {
            component.getAllKecamatan(kabupaten.id)
            component.allKecamatan.every(kecamatan => {
                expect(kecamatan.regency_id).toEqual(kabupaten.id);
            });
        });
    });

    it('should gather all Kelurahan under selected Kecamatan', () => {
        let sampleKecamatan: Kecamatan[] = [{ "id": "1101010", "regency_id": "1101", "name": "TEUPAH SELATAN" }, { "id": "1101020", "regency_id": "1101", "name": "SIMEULUE TIMUR" }]
        sampleKecamatan.every(kecamatan => {
            component.getAllKelurahan(kecamatan.id);
            component.allKelurahan.every(kelurahan => {
                expect(kelurahan.district_id).toEqual(kecamatan.id);
            });
        });
    });

});

class MockWilayahindoService {

    getAllProvinsi(): Observable<Provinsi[]> {
        return of([{ "id": "11", "name": "ACEH" }, { "id": "12", "name": "SUMATERA UTARA" }]);
    }

    getAllKabupaten(provinceId: string): Observable<Kabupaten[]> {
        switch (provinceId) {
            case '11':
                return of([{ "id": "1101", "province_id": "11", "name": "KABUPATEN SIMEULUE" }, { "id": "1102", "province_id": "11", "name": "KABUPATEN ACEH SINGKIL" }]);
            case '12':
                return of([{ "id": "1201", "province_id": "12", "name": "KABUPATEN NIAS" }, { "id": "1202", "province_id": "12", "name": "KABUPATEN MANDAILING NATAL" }]);
            default:
                return of([]);
        }
    }

    getAllKecamatan(kabupatenId: string): Observable<Kecamatan[]> {
        switch (kabupatenId) {
            case '1101':
                return of([{ "id": "1101010", "regency_id": "1101", "name": "TEUPAH SELATAN" }, { "id": "1101020", "regency_id": "1101", "name": "SIMEULUE TIMUR" }]);
            case '1102':
                return of([{ "id": "1102010", "regency_id": "1102", "name": "PULAU BANYAK" }, { "id": "1102011", "regency_id": "1102", "name": "PULAU BANYAK BARAT" }]);
            case '1201':
                return of([{ "id": "1201060", "regency_id": "1201", "name": "IDANO GAWO" }, { "id": "1201061", "regency_id": "1201", "name": "BAWOLATO" }]);
            case '1202':
                return of([{ "id": "1202010", "regency_id": "1202", "name": "BATAHAN" }, { "id": "1202011", "regency_id": "1202", "name": "SINUNUKAN" }]);
            default:
                return of([]);
        }
    }

    getAllKelurahan(kecamatanId: string): Observable<Kelurahan[]> {
        switch (kecamatanId) {
            case '1101010':
                return of([{ "id": "1101010001", "district_id": "1101010", "name": "LATIUNG" }, { "id": "1101010002", "district_id": "1101010", "name": "LABUHAN BAJAU" }]);
            case '1101020':
                return of([{ "id": "1101020022", "district_id": "1101020", "name": "AIR PINANG" }, { "id": "1101020023", "district_id": "1101020", "name": "KUALA MAKMUR" }]);
            case '1102010':
                return of([{ "id": "1102010003", "district_id": "1102010", "name": "PULAU BAGUK" }, { "id": "1102010004", "district_id": "1102010", "name": "PULAU BALAI" }]);
            case '1102011':
                return of([{ "id": "1102011001", "district_id": "1102011", "name": "ASANTOLA" }, { "id": "1102011002", "district_id": "1102011", "name": "UJUNG SIALIT" }]);
            case '1201060':
                return of([{ "id": "1201060015", "district_id": "1201060", "name": "TETE GOENAAI" }, { "id": "1201060016", "district_id": "1201060", "name": "LAOWO HILIMBARUZO" }]);
            case '1201061':
                return of([{ "id": "1201061001", "district_id": "1201061", "name": "SIOFA BANUA" }, { "id": "1201061002", "district_id": "1201061", "name": "SIFAOROASI ULUHOU" }]);
            case '1202010':
                return of([{ "id": "1202010001", "district_id": "1202010", "name": "PULAU TAMANG" }, { "id": "1202010002", "district_id": "1202010", "name": "PASAR BATAHAN" }]);
            case '1202011':
                return of([{ "id": "1202011001", "district_id": "1202011", "name": "SINUNUKAN IV" }, { "id": "1202011002", "district_id": "1202011", "name": "SINUNUKAN II" }]);
            default:
                return of([]);
        }
    }
}