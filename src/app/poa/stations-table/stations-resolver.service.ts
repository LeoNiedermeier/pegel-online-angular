import { Message } from '../../core/message/message';
import { MessageService } from '../../core/message/message.service';
import { BaseResolver } from '../shared/baseresolver';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Station } from '../shared/station.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StationsResolver extends BaseResolver<Station[]> {

  constructor(private pegelOnlineService: PegelOnlineService, messageService: MessageService) {
    super(messageService);

  }

  doResolve(routeSnapshot: ActivatedRouteSnapshot): Observable<Station[]> {
    const water = routeSnapshot.params['water'];

    // compare with null: == instead of ===
    return (water == null ? this.pegelOnlineService.getStations() : this.pegelOnlineService.getStationsForWater(water));
  }
}
