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
    postCloseBudget(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idBudget') {
                formData.append(i, form.controls[i].value);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apipostCloseBudget, formData)
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
            } else {
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
    apiPostCreateFE(form: any): Observable<any> {
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
        return this.http.post(CONFIG.apiPostCreateFE, formData)
    }
    apiGetPeriodFE(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriodFE, formData)


    }

    apiPostRejectFE(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatE') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostRejectFE, formData)
    }
    apiPostLoadFloatE(form: any): Observable<any> {
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
        return this.http.post(CONFIG.apiPostLoadFloatE, formData)
    }

    apiPostApproveFE(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatE') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostApproveFE, formData)
    }

    apiPostSendApproveFE(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatE') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostSendApproveFE, formData)
    }

    apiPostFEByID(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idFloatE') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostFEByID, formData)
    }
    apiGetFEAll(form: any) {
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
        return this.http.post(CONFIG.apiGetFEAll, formData);
    }

    apigetDetailFloatE(form: any, IdBudgetV5: any): Observable<any> {
        var formData: any = new FormData();
        formData.append('IdBudgetV5', IdBudgetV5);
        for (let i in form.controls) {
            if (i == 'idFloatE') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apigetDetailFloatE, formData)
    }
    apiPostPeriodReportFE(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodReportFE, formData)

    }




    apiPostCreateMT(form: any): Observable<any> {
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
        return this.http.post(CONFIG.apiPostCreateMT, formData)
    }
    apiGetPeriodMT(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetPeriodMT, formData)


    }

    apiPostRejectMT(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idMeet') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostRejectMT, formData)
    }
    apiPostLoadMeet(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i != 'DatosMeet') {
                if (i == 'PERIODO') {
                    formData.append(i, form.controls[i].value.date);

                } else if (i == 'Option') {
                    formData.append(i, form.controls[i].value.Code);
                } else {
                    formData.append(i, form.controls[i].value);
                }
            }

        }
        return this.http.post(CONFIG.apiPostLoadMeet, formData)
    }

    apiPostApproveMT(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idMeet') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostApproveMT, formData)
    }

    apiPostSendApproveMT(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idMeet') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostSendApproveMT, formData)
    }

    apiPostMTByID(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idMeet') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostMTByID, formData)
    }
    apiGetMTAll(form: any) {
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
        return this.http.post(CONFIG.apiGetMTAll, formData);
    }

    apigetDetailMeet(form: any, IdBudgetV5: any): Observable<any> {
        var formData: any = new FormData();
        formData.append('IdBudgetV5', IdBudgetV5);
        for (let i in form.controls) {
            if (i == 'idMeet') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apigetDetailMeet, formData)
    }
    apiPostPeriodReportMT(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodReportMT, formData)

    }


    apiGetAdAndRedAll(form: any) {
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
        return this.http.post(CONFIG.apiGetAdReAll, formData);
    }


}