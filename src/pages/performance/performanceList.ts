import { Component, OnDestroy } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { PerformanceDetailController } from './performanceDetail'

import { FirestoreService } from '../../services/firestoreService'
import { MaintainSheet } from '../../angularModel'

import { Subscription } from 'rxjs'

@Component({
    selector: 'page-performanceList',
    templateUrl: 'performanceList.html',
})
export class PerformanceListController implements OnDestroy {
    performanceDetailPage: any = PerformanceDetailController

    logged: Boolean = false
    studentsSubscription: Subscription
    maintains = new Array<MaintainSheet>()

    constructor(private firestoreService: FirestoreService, angularfireAuth: AngularFireAuth) {
        angularfireAuth.authState.subscribe(firebaseUser => {
            this.logged = !!firebaseUser
            if (this.logged){
                this.studentsSubscription = this.firestoreService.getMaintains().subscribe(maintains => this.maintains = maintains.sort(this.up))                
            }else{
                this.ngOnDestroy()
            }
        })
    }
    up(x:MaintainSheet,y:MaintainSheet){
        return Number(y.id) -Number(x.id)
    }

    ngOnDestroy() {
        if (this.studentsSubscription)
            this.studentsSubscription.unsubscribe()
        this.maintains = []
    }
}
