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
    downloadADRE(url: string, typeFile: string): Observable<Blob> {
        var param = '&typeFile=' + typeFile;
        return this.http.get(url + param, {
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
    apiPostPeriodReportFP(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodReportFP, formData)

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

    /*  */
    /*adred detalle */

    apiPostAdReByID(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idAdRed') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostAdReByID, formData)
    }

    apiPostApproveAdRe(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idAdRed') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostApproveAdRe, formData)
    }
    apiPostRejectAdRe(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idAdRed') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostRejectAdRe, formData)
    }

    apiPostLoadAdicion(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i != 'DatosAdRed') {
                if (i == 'PERIODO') {
                    formData.append(i, form.controls[i].value.date);

                } else if (i == 'Option') {
                    formData.append(i, form.controls[i].value.Code);
                } else {
                    formData.append(i, form.controls[i].value);
                }
            }

        }
        return this.http.post(CONFIG.apiPostLoadAdicion, formData)
    }

    apiPostLoadReduccion(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i != 'DatosAdRed') {
                if (i == 'PERIODO') {
                    formData.append(i, form.controls[i].value.date);

                } else if (i == 'Option') {
                    formData.append(i, form.controls[i].value.Code);
                } else {
                    formData.append(i, form.controls[i].value);
                }
            }

        }
        return this.http.post(CONFIG.apiPostLoadReduccion, formData)
    }

    /* */
    apiPostCreatePagos(form: any): Observable<any> {
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
    apiGetPeriodPagos(form: any) {
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

    apiPostRejectPagos(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idPagos') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostRejectFE, formData)
    }
    apiPostLoadPagos(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i != 'DatosPayments') {
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

    apiPostApprovePagos(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idPagos') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostApproveFE, formData)
    }

    apiPostSendApprovePagos(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idPagos') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostSendApproveFE, formData)
    }

    apiPostPagosByID(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idPagos') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPagosByID, formData)
    }
    apiGetPagosAll(form: any) {
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
        return this.http.post(CONFIG.apiGetPagosAll, formData);
    }

    apigetDetailPagos(form: any, IdBudgetV5: any): Observable<any> {
        var formData: any = new FormData();
        formData.append('IdBudgetV5', IdBudgetV5);
        for (let i in form.controls) {
            if (i == 'idPagos') {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apigetDetailPagos, formData)
    }
    apiPostPeriodReportPagos(form: any) {
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
    apiGetRunPagos() {
        return this.http.get(CONFIG.apiGetRunPagos)
    }

    apiPostPeriodReportBudget(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);

            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodReportBudget, formData)

    }

    /*apis de revenue*/

    apiPostPeriodRevenue(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostPeriodRevenue, formData)

    }
    apiPostCreaRevenue(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'PERIODO') {
                formData.append(i, form.controls[i].value.date);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiPostLoadRevenue, formData)

    }
    getGetRevenues(form: any) {
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
        return this.http.post(CONFIG.apiGetRevenues, formData);
    }


    GetRevenue(form: any): Observable<any> {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idRevenue') {
                formData.append(i, form.controls[i].value);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apiGetrevenue, formData)
    }
    postCloseRevenue(form: any) {
        var formData: any = new FormData();
        for (let i in form.controls) {
            if (i == 'idRevenue') {
                formData.append(i, form.controls[i].value);
            } else {
                formData.append(i, form.controls[i].value);
            }
        }
        return this.http.post(CONFIG.apipostCloseRevenue, formData)
    }
}
