import { Component } from '@angular/core'

import { MemberListController } from '../member/memberList'
import { PerformanceListController } from '../performance/performanceList'
// import { ContactListController } from '../message/contactList'
import { SettingController } from '../setting/setting'

@Component({
    templateUrl: 'tabs.html'
})
export class TabsController {

    memberListPage = MemberListController
    performanceListPage = PerformanceListController
    // contactListPage = ContactListController
    settingPage = SettingController

    constructor() { }
    
}
