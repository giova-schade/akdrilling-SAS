import { Injectable } from '@angular/core';
import { User , Cias} from '../models/user';
import { Role, AKDABRRHH, AKDADM, AKDABOP, AKDABDF, AKDAFP, AKDAAFP, AKDAFE, AKDAAFE, AKDARFE  } from '../models/role';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../environments/global.component';
import { MenuItem } from 'primeng/api';
import { UrlSerializer } from '@angular/router';




export const alllinks: MenuItem[] = [
    {
        routerLink: "Home",
        label: "Inicio",
        icon: "pi pi-home"
    },
    {
        routerLink: "uploadFiles",
        label: "Carga de maestros",
        icon: "pi pi-cloud-upload"
    }, {
        routerLink: "openPeriod",
        label: "Abrir periodo",
        icon: "pi pi-play"
    }, {
        routerLink: "closePeriod",
        label: "Cerrar periodo",
        icon: "pi pi-exclamation-circle"
    }, {
        routerLink: "reopenPeriod",
        label: "reabrir periodo",
        icon: "pi pi-refresh"
    }, {
        routerLink: "budget",
        label: "Budget",
        icon: "pi pi-wallet"
    }, {
        routerLink: "floatPlanned",
        label: "Float planificado",
        icon: "pi pi-money-bill"
    },
    {
        label: 'Float en ejecución',
        icon: '',
        items: [
            {
                routerLink: "floatInAction",
                label: "Crear Float en ejecución",
                icon: "pi pi-dollar"
            },
            {
                routerLink: "floatInAction/payments",
                label: "Pagos",
                icon: "pi pi-bell"
            },
            {
                routerLink: "floatInAction/meet",
                label: "meet",
                icon: "pi pi-users"
            },
            {
                routerLink: "floatInAction/adAndRed",
                label: "Adicciones y reducciones",
                icon: "pi pi-calendar-minus"
            }
        ]
    },
    {
        routerLink: "dashboard",
        label: "Reportes",
        icon: "pi pi-chart-line"
    }
];
export const links: MenuItem[] = []
@Injectable()

export class AuthService {
    private user: User = new User;
    private cias: Cias = new Cias;
    constructor(private http: HttpClient) {

    }
    isAuthorized() {
        return !!this.user;
    }

    hasRole(role: Role) {
        return this.isAuthorized() && this.user.role === role;
    }

    login(role: Role, name: any, info: any , roleDescription:any , ciaSelected:any) {
        this.user = { role: role,name: name, info: info , roleDescription: roleDescription , ciaSelected };
        this.cias = {info: info }
    }
    GetuserInfo() {
        return this.user;
    }
    GetCias(){
            return this.cias;
    }
    GetUserOptions(role: any) {
        alllinks.forEach((link) => {
            this.pushlink(role, link);
        })
        return links;
    }


    getUser(): Observable<any> {
        return this.http.get(CONFIG.apiUrlLogin);
    }

    pushlink(role: string, link: any) {
        if (role == "AKDADM") {            
            let roleConfig = AKDADM;   

            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
                
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){   
                if(subrl.items.length){
                 links.push(subrl);                    
                }              
            };
        } else if (role == "AKDABRRHH") {
            let roleConfig = AKDABRRHH;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        } else if (role == "AKDABOP") {
            let roleConfig = AKDABOP;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDABDF") {
            let roleConfig = AKDABDF;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDAFP") {
            let roleConfig = AKDAFP;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDAAFP") {
            let roleConfig = AKDAAFP;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDAFE") {
            let roleConfig = AKDAFE;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDAAFE") {
            let roleConfig = AKDAAFE;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }else if (role == "AKDARFE") {
            let roleConfig = AKDARFE;
            if (this.ValidaUrl(link, roleConfig)) {
                link.routerLink=role+'/'+link.routerLink;
                links.push(link);
            }
            let subrl = this.PushSuburl(link,roleConfig,role); 
            if(subrl.hasOwnProperty('items')){                 
                if(subrl.items.length){
                    links.push(subrl);                    
                   } 
            };
        }


    }
    PushSuburl(link: any, roleConfig : any, role : string){
        var  suburl = [];
        if (link.hasOwnProperty('items')){
            for ( let subitem in link.items ){
                if(link.items[subitem].routerLink.indexOf('/') > 0){
                    for(let sub in roleConfig){
                        if (sub == link.items[subitem].routerLink.split('/')[1] && roleConfig[sub] == 'Yes'  ){
                            link.items[subitem].routerLink=role+'/'+link.items[subitem].routerLink;
                            suburl.push(link.items[subitem]);
                        }
                    }
                }else{
                    console.log(link.items[subitem].routerLink);
                    for(let sub in roleConfig){
                        if (sub == link.items[subitem].routerLink && roleConfig[sub] == 'Yes'  ){
                            link.items[subitem].routerLink=role+'/'+link.items[subitem].routerLink;
                            suburl.push(link.items[subitem]);
                        }
                    }
                }
            }
            link.items=suburl;
        }

        return link;
    }
    ValidaUrl(pagina: any, paginas: any) {
        for (let valor in paginas) {
            if (valor == pagina.routerLink && paginas[valor] == 'Yes') {
                return true;
            }
        }

        return false;
    }


}
