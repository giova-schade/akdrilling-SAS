import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../environments/global.component';

@Injectable()
export class MaestrosService {
    constructor(private http: HttpClient) { }

    getMaestroFlujoCaja(): Observable<any> {
        return this.http.get(CONFIG.apiFlujoCaja);
    }
    getMaestroTipoServicio(): Observable<any> {
        return this.http.get(CONFIG.apiTipoServicio);
    }
    getMaestroProyecto(): Observable<any> {
        return this.http.get(CONFIG.apiProyecto);
    }
    getMaestroMaquinas(): Observable<any> {
        return this.http.get(CONFIG.apiMaquinas);
    }
    getMaestroSedes(): Observable<any> {
        return this.http.get(CONFIG.apiSedes);
    }
    getMaestroAuxiliares(): Observable<any> {
        return this.http.get(CONFIG.apiAuxiliares);
    }
    getMaestroUnidadNegocio(): Observable<any> {
        return this.http.get(CONFIG.apiUnidadNegocio);
    }
    getMaestroTipoMoneda(): Observable<any> {
        return this.http.get(CONFIG.apiTipoMo);
    }
    getMaestroTipoAreas(): Observable<any> {
        return this.http.get(CONFIG.apiAreas);
    }
    getMaestroCostos(): Observable<any> {
        return this.http.get(CONFIG.apiCostos);
    }
    getLoadMaster(maestro: string): Observable<any> {
        return this.http.get(CONFIG.apiMaster + maestro);
    }

    getPeriod(form: any): Observable<any> {

        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriod, formData)
    }

    postCreatePeriod(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.postCreatePeriod, formData)
    }
    GetPeriodClose(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriodClose, formData)
    }
    postClosePeriod(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.postClosePeriod, formData)
    }
    getPeriodBudget(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriodBudget, formData)

    }

    getGetBudgets(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else if (i == 'Option') {
                formData.append(i, form.controls[i].value.Code);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetBudgets, formData);
    }

    postCreaBudget(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else if (i == 'Option') {
                formData.append(i, form.controls[i].value.Code);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostCreaBudget, formData)
    }

    apiPostCreateFP(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else if (i == 'Option') {
                formData.append(i, form.controls[i].value.Code);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostCreateFP, formData)
    }

    GetBudget(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idBudget') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetBudget, formData)
    }
    download(url: string): Observable<Blob> {
        return this.http.get(url, {
            responseType: 'blob'
        })
    }

    downloadError(url: string, form: any): Observable<Blob> {

        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else if (i == 'Option') {
                formData.append(i, form.controls[i].value.Code);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }

        return this.http.get(url, {
            responseType: 'blob'
        })
    }
    apiGetPeriodFP(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriodFP, formData)


    }

    apiPostRejectFP(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatP') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostRejectFP, formData)
    }
    apiPostLoadFloatP(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i != 'DatosFloatP') {
                if (i == 'PERIODO') {
                    formData.append(i, form.controls[i].value.date);

                } else if (i == 'Option') {
                    formData.append(i, form.controls[i].value.Code);
                } else {
                    formData.append(i, form.controls[i].value);
                }
            }

        }
        return this.http.post(CONFIG.apiPostLoadFloatP, formData)
    }

    apiPostApproveFP(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatP') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostApproveFP, formData)
    }

    apiPostSendApproveFP(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatP') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostSendApproveFP, formData)
    }

    apiPostFPByID(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatP') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostFPByID, formData)
    }
    apiGetFPAll(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else if (i == 'Option') {
                formData.append(i, form.controls[i].value.Code);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetFPAll, formData);
    }

    apigetDetailFloat(form: any, IdBudgetV5: any): Observable<any> {
        var formData: any = new FormData();
        formData.append('IdBudgetV5', IdBudgetV5);
        for (let i in form.controls) {
            if (i == 'idFloatP') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apigetDetailFloat, formData)
    }
    apiPostPeriodReportFI(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodReportFI, formData)

    }

}