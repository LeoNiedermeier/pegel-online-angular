import { MessageService } from '../../core/message/message.service';
import { BaseResolver } from '../shared/baseresolver';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { WaterLevel } from '../shared/waterlevel.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment';


@Injectable()
export class WaterLevelResolver extends BaseResolver<WaterLevel[]> {

  constructor(private pegelOnlineService: PegelOnlineService, messageService: MessageService) {
    super(messageService);
  }

  doResolve(route: ActivatedRouteSnapshot): Observable<WaterLevel[]> {
    const stationShortName = route.params['stationShortName'];

    const days = route.params['days'];
    const hours = route.params['hours'];

    const duration =
      days != null || hours != null ?
        moment.duration({ hours: hours, days: days }) : null;

    return this.pegelOnlineService.getWaterLevels(stationShortName, duration);
  }
}
