import datetime
headexcel = {headexcel}
dataExcel = {dataExcel}
dataOuptut = []
camposValidos = {camposValidos}
SetVar('dataOuptut','[]') 

today = datetime.date.today()
if(today.weekday() == 0):
	last_monday = today - datetime.timedelta(days=today.weekday()+7)
else:
	last_monday = today - datetime.timedelta(days=today.weekday()+7)
    
if (len(headexcel) == 1):
    headexcel=headexcel[0]
def getPositionVal(headexcel,camposValidos ):
    positions = []      
    for head in camposValidos:
        try:
            index_value = headexcel.index(head)
            positions.append(index_value)
        except ValueError:
            index_value = -1
    return positions
  
if (len(dataExcel)):
    pos = getPositionVal(headexcel,camposValidos)
    for  index , datoexcel in enumerate(dataExcel): 
        _head ={}
        for  p  in  pos:
            _head[headexcel[p]]=datoexcel[p]
            
        date_time_obj = datetime.datetime.strptime(_head['Fecha de Aplicación'], '%d-%m-%Y')        
        date_compare =datetime.datetime.strptime(last_monday.strftime("%d-%m-%Y"), '%d-%m-%Y')
        print(_head)
        if date_compare <= date_time_obj:
          if _head['Póliza'].find('.'):
            _head['Póliza']=str(int(float(_head['Póliza'])))
          if _head['Endoso'].find('.'):
            _head['Endoso']=str(int(float(_head['Endoso'])))
          if _head['# de recibo'].find('.'):
            _head['# de recibo']=str(int(float(_head['# de recibo'])))  
          if _head['Recibo'].find('.'):
            _head['Recibo']=str(int(float(_head['Recibo'])))
          if _head['# de Agente'].find('.'):
            _head['# de Agente']=str(int(float(_head['# de Agente'])))             
          dataOuptut.append(_head)
        
        
    if(len(dataOuptut) > 0):
        SetVar('dataOuptut',dataOuptut)
    else:
        SetVar('dataOuptut','[]')      
else:
    SetVar('dataOuptut','[]')