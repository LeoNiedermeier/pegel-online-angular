import { Message } from '../../core/message/message';
import { MessageService } from '../../core/message/message.service';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { WaterLevel } from '../shared/waterlevel.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, Params } from '@angular/router';
import 'rxjs/add/operator/catch';



@Injectable()
export class WaterLevelResolver implements Resolve<WaterLevel[]> {

  constructor(private pegelOnlineService: PegelOnlineService, private router: Router, private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<WaterLevel[]> {
    const stationShortName = route.params['stationShortName'];
    return this.pegelOnlineService.getWaterLevels(stationShortName).
      // TODO
      // do not navigate?
      // show error in error panel
      catch((error: any) => { this.messageService.publish(Message.error('Error: ' + error)); return Observable.of(null); });
  }
}
