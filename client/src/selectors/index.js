import { createSelector } from 'reselect';

export const requestStateSelector = state => state.requests;

export const requestMapSelector = state => requestStateSelector(state).get('requests'); 

export const isLoading = request => !request.get('endTime');

export const oldestSelector = createSelector(
  requestMapSelector,
  requestMap => requestMap
    .valueSeq()
    .sortBy(request => request.get('startTime'))
    .toList()
);

export const completedSelector = createSelector(
  requestMapSelector,
  requestMap => requestMap
    .valueSeq()
    .filter(request => !isLoading(request))
    .sortBy(request => request.get('endTime'))
    .toList()
);
