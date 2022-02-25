import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Kabupaten } from "./kabupaten";
import { Kecamatan } from "./kecamatan";
import { Kelurahan } from "./kelurahan";
import { Provinsi } from "./provinsi";
import { WilayahindoService } from "./wilayahindo.service";

describe('WilayahindoService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let service: WilayahindoService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new WilayahindoService(httpClientSpy);
    });

    it('shoulld return all provinsi', (done: DoneFn) => {
        const expectedAllProvinsi: Provinsi[] = [{"id":"11","name":"ACEH"},{"id":"12","name":"SUMATERA UTARA"},{"id":"13","name":"SUMATERA BARAT"},{"id":"14","name":"RIAU"},{"id":"15","name":"JAMBI"},{"id":"16","name":"SUMATERA SELATAN"},{"id":"17","name":"BENGKULU"},{"id":"18","name":"LAMPUNG"},{"id":"19","name":"KEPULAUAN BANGKA BELITUNG"},{"id":"21","name":"KEPULAUAN RIAU"},{"id":"31","name":"DKI JAKARTA"},{"id":"32","name":"JAWA BARAT"},{"id":"33","name":"JAWA TENGAH"},{"id":"34","name":"DI YOGYAKARTA"},{"id":"35","name":"JAWA TIMUR"},{"id":"36","name":"BANTEN"},{"id":"51","name":"BALI"},{"id":"52","name":"NUSA TENGGARA BARAT"},{"id":"53","name":"NUSA TENGGARA TIMUR"},{"id":"61","name":"KALIMANTAN BARAT"},{"id":"62","name":"KALIMANTAN TENGAH"},{"id":"63","name":"KALIMANTAN SELATAN"},{"id":"64","name":"KALIMANTAN TIMUR"},{"id":"65","name":"KALIMANTAN UTARA"},{"id":"71","name":"SULAWESI UTARA"},{"id":"72","name":"SULAWESI TENGAH"},{"id":"73","name":"SULAWESI SELATAN"},{"id":"74","name":"SULAWESI TENGGARA"},{"id":"75","name":"GORONTALO"},{"id":"76","name":"SULAWESI BARAT"},{"id":"81","name":"MALUKU"},{"id":"82","name":"MALUKU UTARA"},{"id":"91","name":"PAPUA BARAT"},{"id":"94","name":"PAPUA"}];
        httpClientSpy.get.and.returnValue(of(expectedAllProvinsi));
        service.getAllProvinsi().subscribe({
            next: allProvinsi => {
                expect(allProvinsi)
                .withContext('expected all provinsi')
                .toEqual(expectedAllProvinsi);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });

    it('shoulld return all kabupaten of selected provinsi {id: 11, name; "ACEH"}', (done: DoneFn) => {
        const expectedAllKabupaten: Kabupaten[] = [{"id":"1101","province_id":"11","name":"KABUPATEN SIMEULUE"},{"id":"1102","province_id":"11","name":"KABUPATEN ACEH SINGKIL"},{"id":"1103","province_id":"11","name":"KABUPATEN ACEH SELATAN"},{"id":"1104","province_id":"11","name":"KABUPATEN ACEH TENGGARA"},{"id":"1105","province_id":"11","name":"KABUPATEN ACEH TIMUR"},{"id":"1106","province_id":"11","name":"KABUPATEN ACEH TENGAH"},{"id":"1107","province_id":"11","name":"KABUPATEN ACEH BARAT"},{"id":"1108","province_id":"11","name":"KABUPATEN ACEH BESAR"},{"id":"1109","province_id":"11","name":"KABUPATEN PIDIE"},{"id":"1110","province_id":"11","name":"KABUPATEN BIREUEN"},{"id":"1111","province_id":"11","name":"KABUPATEN ACEH UTARA"},{"id":"1112","province_id":"11","name":"KABUPATEN ACEH BARAT DAYA"},{"id":"1113","province_id":"11","name":"KABUPATEN GAYO LUES"},{"id":"1114","province_id":"11","name":"KABUPATEN ACEH TAMIANG"},{"id":"1115","province_id":"11","name":"KABUPATEN NAGAN RAYA"},{"id":"1116","province_id":"11","name":"KABUPATEN ACEH JAYA"},{"id":"1117","province_id":"11","name":"KABUPATEN BENER MERIAH"},{"id":"1118","province_id":"11","name":"KABUPATEN PIDIE JAYA"},{"id":"1171","province_id":"11","name":"KOTA BANDA ACEH"},{"id":"1172","province_id":"11","name":"KOTA SABANG"},{"id":"1173","province_id":"11","name":"KOTA LANGSA"},{"id":"1174","province_id":"11","name":"KOTA LHOKSEUMAWE"},{"id":"1175","province_id":"11","name":"KOTA SUBULUSSALAM"}]
        httpClientSpy.get.and.returnValue(of(expectedAllKabupaten));
        service.getAllKabupaten('11').subscribe({
            next: allKabupaten => {
                expect(allKabupaten)
                .withContext('expected all kabupaten of selected provinsi {id: 11, name= "ACEH"}')
                .toEqual(expectedAllKabupaten);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });

    it('shoulld return all kecamatan of selected kabupaten {id: 1103, name; "ACEH SELATAN"}', (done: DoneFn) => {
        const expectedAllKecamatan: Kecamatan[] = [{"id":"1103010","regency_id":"1103","name":"TRUMON"},{"id":"1103011","regency_id":"1103","name":"TRUMON TIMUR"},{"id":"1103012","regency_id":"1103","name":"TRUMON TENGAH"},{"id":"1103020","regency_id":"1103","name":"BAKONGAN"},{"id":"1103021","regency_id":"1103","name":"BAKONGAN TIMUR"},{"id":"1103022","regency_id":"1103","name":"KOTA BAHAGIA"},{"id":"1103030","regency_id":"1103","name":"KLUET SELATAN"},{"id":"1103031","regency_id":"1103","name":"KLUET TIMUR"},{"id":"1103040","regency_id":"1103","name":"KLUET UTARA"},{"id":"1103041","regency_id":"1103","name":"PASIE RAJA"},{"id":"1103042","regency_id":"1103","name":"KLUET TENGAH"},{"id":"1103050","regency_id":"1103","name":"TAPAK TUAN"},{"id":"1103060","regency_id":"1103","name":"SAMA DUA"},{"id":"1103070","regency_id":"1103","name":"SAWANG"},{"id":"1103080","regency_id":"1103","name":"MEUKEK"},{"id":"1103090","regency_id":"1103","name":"LABUHAN HAJI"},{"id":"1103091","regency_id":"1103","name":"LABUHAN HAJI TIMUR"},{"id":"1103092","regency_id":"1103","name":"LABUHAN HAJI BARAT"}]
        httpClientSpy.get.and.returnValue(of(expectedAllKecamatan));
        service.getAllKecamatan('1103').subscribe({
            next: allKabupaten => {
                expect(allKabupaten)
                .withContext('expected all kecamatan of selected kabupaten {id: 1103, name= "ACEH SELATAN"}')
                .toEqual(expectedAllKecamatan);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });

    it('shoulld return all kelurahan of selected kecamatan {id: 1103010, name; "TRUMON"}', (done: DoneFn) => {
        const expectedAllKelurahan: Kelurahan[] = [{"id":"1103010001","district_id":"1103010","name":"KUTA PADANG"},{"id":"1103010002","district_id":"1103010","name":"RAKET"},{"id":"1103010003","district_id":"1103010","name":"GAMPONG TENGAH"},{"id":"1103010004","district_id":"1103010","name":"TEPIN TINGGI"},{"id":"1103010005","district_id":"1103010","name":"IE MEUDAMA"},{"id":"1103010009","district_id":"1103010","name":"UJONG TAN0H"},{"id":"1103010010","district_id":"1103010","name":"KEUDE TRUMON"},{"id":"1103010011","district_id":"1103010","name":"KUTA BARU"},{"id":"1103010012","district_id":"1103010","name":"SINGLENG"},{"id":"1103010013","district_id":"1103010","name":"PANTON BILI"},{"id":"1103010027","district_id":"1103010","name":"UPT II PD HARAPAN"},{"id":"1103010030","district_id":"1103010","name":"SEUNABOK JAYA (EX UPT V)"}]
        httpClientSpy.get.and.returnValue(of(expectedAllKelurahan));
        service.getAllKelurahan('1103').subscribe({
            next: allKabupaten => {
                expect(allKabupaten)
                .withContext('expected all kelurahan of selected kecamatan {id: 1103010, name= "TRUMON"}')
                .toEqual(expectedAllKelurahan);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });
    
    it('should return an empty array when the server returns a 404', (done: DoneFn) => {
        const emptyKabupaten: Kabupaten[] = [];
      
        httpClientSpy.get.and.returnValue(of(emptyKabupaten));
      
        service.getAllKabupaten('nonexistent_id').subscribe({
          next: allProvinsi => {
            expect(allProvinsi)
            .withContext('expected empty')
            .toEqual(emptyKabupaten);
            done();
        },
          error: done.fail
        });
      });
    
});