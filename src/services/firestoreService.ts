import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { MaintainSheet, Admin } from '../angularModel'

@Injectable()
export class FirestoreService {
    // private studentCollection: AngularFirestoreCollection<Student>
    private adminCollection: AngularFirestoreCollection<Admin>
    private maintainCollection: AngularFirestoreCollection<MaintainSheet>


    constructor(database: AngularFirestore) {
        // this.studentCollection = database.collection<Student>("Student", ref => ref.orderBy("performance.practiceRank", "asc"))
        this.maintainCollection = database.collection<MaintainSheet>("MaintainSheet")
        this.adminCollection = database.collection<Admin>("Admin")
    }

    // getStudents(): Observable<Student[]> {
    //     return this.studentCollection.valueChanges()
    // }=>getAdmins

    // getStudentByStudentId(studentId: string): Observable<Student> {
    //     return this.studentCollection.doc<Student>(studentId).valueChanges()
    // }=>getAdminByEmail

    getMaintainById(maintainId: string): Observable<MaintainSheet> {
        return this.maintainCollection.doc<MaintainSheet>(maintainId).valueChanges()
    }

    getAdminByEmail(email :string): Observable<Admin> {
        return this.adminCollection.doc<Admin>(email).valueChanges()
    }

    setMaintain(maintain: MaintainSheet): Promise<void> {
        console.log(maintain)
        console.log(this.maintainCollection.doc(maintain.id))
        return this.maintainCollection.doc(maintain.id).update(maintain)
    }

    // setFcmToken(admin: Admin): Promise<void> {
    //     return this.adminCollection.doc<Admin>(admin.account).update({
    //         member: admin.member
    //     })
    // }

    getAdmins(): Observable<Admin[]> {
        return this.adminCollection.valueChanges()
    }

    getMaintains(): Observable<MaintainSheet[]> {
        return this.maintainCollection.valueChanges()
    }

    getAdminByAccount(account: string): Observable<Admin> {
        return this.adminCollection.doc<Admin>(account).valueChanges()
    }

}