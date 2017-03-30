import { Message } from '../../core/message/message';
import { MessageService } from '../../core/message/message.service';
import { BaseResolver } from '../shared/baseresolver';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { WaterLevel } from '../shared/waterlevel.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Params } from '@angular/router';
import 'rxjs/add/operator/catch';



@Injectable()
export class WaterLevelResolver extends BaseResolver<WaterLevel[]> {

  constructor(private pegelOnlineService: PegelOnlineService, messageService: MessageService) {
    super(messageService);
  }

  doResolve(route: ActivatedRouteSnapshot): Observable<WaterLevel[]> {
    const stationShortName = route.params['stationShortName'];
    return this.pegelOnlineService.getWaterLevels(stationShortName);
  }
}
