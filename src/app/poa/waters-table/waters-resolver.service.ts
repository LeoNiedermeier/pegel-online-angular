import { Message } from '../../core/message/message';
import { MessageService } from '../../core/message/message.service';
import { BaseResolver } from '../shared/baseresolver';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WatersResolver extends BaseResolver<Water[]> {

  constructor(private pegelOnlineService: PegelOnlineService, messageService: MessageService) {
    super(messageService);
  }

  doResolve(): Observable<Water[]> {
    return this.pegelOnlineService.getWaters();
  }
}

// centralize configuration of resolver and resolved data structure
// net to know in route configuration and in the component
export const WATERS_RESOLVER = { waters: WatersResolver };

export interface WatersResolverResolvedData {
  waters: Water[];
}
