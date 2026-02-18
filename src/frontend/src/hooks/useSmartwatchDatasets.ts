import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SmartwatchDataset, UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useAddSmartwatchDataset() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataset: SmartwatchDataset) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addSmartwatchDataset(dataset);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDatasets'] });
    },
  });
}

export function useGetMyDatasets() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SmartwatchDataset[]>({
    queryKey: ['myDatasets'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyDatasets();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useFilterDatasetsByMetric() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      metric,
      minValue,
      maxValue,
    }: {
      metric: string;
      minValue: number | null;
      maxValue: number | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.filterDatasetsByMetric(metric, minValue, maxValue);
    },
  });
}
