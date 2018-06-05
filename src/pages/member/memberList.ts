import { Component } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { MemberDetailController } from '../member/memberDetail'

import { FirestoreService } from '../../services/firestoreService'
import { Admin } from '../../angularModel'
import { Subscription } from 'rxjs'

@Component({
    selector: 'page-memberList',
    templateUrl: 'memberList.html'
})
export class MemberListController {
    memberDetailPage: any = MemberDetailController

    logged: Boolean = false
    studentsSubscription: Subscription
    admins = new Array<Admin>()
    


    constructor(firestoreService: FirestoreService, angularfireAuth: AngularFireAuth) {
        angularfireAuth.authState.subscribe(firebaseUser => {
            this.logged = !!firebaseUser
            if (this.logged){
                this.studentsSubscription = firestoreService.getAdmins().subscribe(admins => this.admins = admins)
            }else{
                this.ngOnDestroy()
            }
        })
    }

    ngOnDestroy() {
        if (this.studentsSubscription)
            this.studentsSubscription.unsubscribe()
        this.admins = []
    }
}
