
export const CONFIG = {
  apiUrlLogin: 'http://192.168.68.71:5000/Login',
  apiFlujoCaja: 'http://192.168.68.71:5000/flujocaja',
  apiTipoServicio: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=TIPOSERVICIO',
  apiProyecto: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=PROYECTO',
  apiMaquinas: 'http://172.16.59.251:5000/maquinas',
  apiSedes: 'http://192.168.68.71:5000/sedes',
  apiAuxiliares: 'http://192.168.68.71:5000/auxiliares',
  apiUnidadNegocio: 'http://192.168.68.71:5000/unidadnegocio',
  apiTipoMo: 'http://192.168.68.71:5000/monedas',
  apiCostos: 'http://192.168.68.71:5000/centrocostos',
  apiAreas: 'http://192.168.68.71:5000/areas',
  apiMaster: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=load&maestro=',
  apiGetPeriod : 'http://192.168.68.71:5000/getPeriod',
  postCreatePeriod : 'http://192.168.68.71:5000/postCreatePeriod',
  apiGetPeriodClose : 'http://192.168.68.71:5000/apiGetPeriodClose',
  postClosePeriod : 'http://192.168.68.71:5000/postClosePeriod',
  apiGetPeriodBudget : 'http://192.168.68.71:5000/apiGetPeriodBudget',
  apiPostCreaBudget : 'http://192.168.68.71:5000/apiPostCreaBudget',
  apiGetBudget : 'http://192.168.68.71:5000/apiGetBudget',
  apiGetBudgets : 'http://192.168.68.71:5000/GetBudgets',
  apiGetPeriodFP : 'http://192.168.68.71:5000/apiGetPeriodFP',
  apiGetFPAll : 'http://192.168.68.71:5000/apiGetFPAll',
  apiPostFPByID : 'http://192.168.68.71:5000/apiPostFPByID',
  apiPostCreateFP : 'http://192.168.68.71:5000/apiPostCreateFP',
  apiPostSendApproveFP : 'http://192.168.68.71:5000/apiPostSendApproveFP',
  apiPostRejectFP : 'http://192.168.68.71:5000/apiPostRejectFP',
  apiPostApproveFP : 'http://192.168.68.71:5000/apiPostApproveFP',
  apiPostLoadFloatP : 'http://192.168.68.71:5000/apiPostLoadFloatP',
  apigetDetailFloat : 'http://192.168.68.71:5000/apigetDetailFloat'
};
/*
export const CONFIG = {
  apiUrlLogin: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=form,properties,execute,newwindow&_program=%2FAKD+International%2FSTP%2FSTP_GetUserSession',
  apiFlujoCaja: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=FLUJOCAJACORPORATIVO',
  apiTipoServicio: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=TIPOSERVICIO',
  apiProyecto: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=PROYECTO',
  apiMaquinas: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=MAQUINAS',
  apiSedes: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=SEDE',
  apiAuxiliares: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=AUXILIARES',
  apiUnidadNegocio: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=UNIDADNEGOCIO',
  apiTipoMo: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=TIPOMONEDA',
  apiCostos: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=CENTROCOSTO',
  apiAreas: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=consulta&maestro=AREAS',
  apiMaster: 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=load&maestro=',
  apiGetPeriod : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=ObtienePeriodosAP',
  postCreatePeriod : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=InsertPeriodo',
  apiGetPeriodClose : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiGetPeriodClose',
  postClosePeriod : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=postClosePeriod',
  apiGetPeriodBudget : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=GetPeriodBudget',
  apiPostCreaBudget : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=CreaBudget',
  apiGetBudget : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=GetBudget',
  apiGetBudgets : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=GetBudgets',
  apiGetPeriodFP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiGetPeriodFP',
  apiGetFPAll : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiGetFPAll',
  apiPostFPByID : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostFPByID',
  apiPostCreateFP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostCreateFP',
  apiPostSendApproveFP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostSendApproveFP',
  apiPostRejectFP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostRejectFP',
  apiPostApproveFP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostApproveFP',
  apiPostLoadFloatP : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apiPostLoadFloatP',
  apigetDetailFloat : 'http://redhat1.internal.cloudapp.net:7980/SASStoredProcess/do?_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=apigetDetailFloat'
};
*/