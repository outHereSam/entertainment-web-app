import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MediaService } from '../../services/media.service';
import {
  loadMediaFailure,
  loadMediaItems,
  loadMediaItemsSuccess,
} from './media.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class MediaEffects {
  constructor(private actions$: Actions, private mediaService: MediaService) {}

  loadMediaItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMediaItems),
      mergeMap(() =>
        this.mediaService.fetchData().pipe(
          //   tap((mediaItems) => console.log('Fetched media items:', mediaItems)), // Log fetched data
          map((mediaItems) => loadMediaItemsSuccess({ media: mediaItems })),
          catchError((error) => of(loadMediaFailure({ error: error.message })))
        )
      )
    )
  );
}
