%let action_=%scan(%quote(&sysparm),1,%str(,));
%let tabla_=%scan(%quote(&sysparm),2,%str(,));

%let username=sasdemo;
%let pwd={SAS002}3CD4EA1E0188202203533924;
%let hostname=http://redhat1.internal.cloudapp.net:7980;
*%let tablamaestra=SEDE;
%let tablamaestra=&tabla_;
%put tablamaestra : &tablamaestra;
filename input TEMP;
filename resp TEMP;
filename headers TEMP;
%global hcode hmessage location ticket tablamaestra;
proc printto log="/sasdata/akdrilling/logs/cargaMaestro_&tablamaestra..log";
run;
/*
 * Create the input file for the first request
 */
%macro tokenSAS;
	data _null_;
		file input recfm=f lrecl=1;
		put "username=&username.%nrstr(&password)=&pwd";
	run;

	proc http method="POST" url="&hostname/SASLogon/v1/tickets" in=input 
			headerout=headers out=resp HEADEROUT_OVERWRITE;
	run;

	%macro echofile(file);

		data _null_;
			infile &file;
			input;
			put _infile_;
		run;

	%mend;

	%echofile(headers);

	data _null_;
		infile headers termstr=CRLF length=c truncover;
		input 
 @'Location: ' loc $127.;
		call symput("location", loc);
	run;

	%put &location;

	proc http method="POST" url="&location" 
			in="service=&hostname/SASStoredProcess/do?" headerout=headers out=resp 
			HEADEROUT_OVERWRITE;
	run;

	%echofile(headers);
	%echofile(resp);
%MEND;
%MACRO main;


data _null_;
	infile resp;
	input @;
	call symput('ticket', cat('&hostname/SASStoredProcess/do', '?ticket=', 
		trim(_infile_), '&_action=execute&_program=%2FAKD+International%2FAPI%2FAKADMAPI&action=load&maestro=&tablamaestra'
		));
run;

%put "&ticket";

proc http method="GET" url="&ticket" out=resp headerout=headers;
run;
%echofile(headers);
%echofile(resp);
filename jsonmap temp;
libname resp sasejson jsonmap=jsonmap automap=replace;

%mend;
%tokenSAS;
%main;
